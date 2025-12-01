<?php

namespace App\Console\Commands;

use App\Models\ProductSale;
use App\Models\Settings;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class STBArchive extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:squaretoboardarchive';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ini_set('memory_limit', '512M');
        $is_local = app()->environment('local');
        while ($is_local && true) {
            $current_datetime = Carbon::now();
            $settings = Settings::first();
            $last_end_of_day_update = $settings->last_end_of_day_update;
            $is_closing_time = $current_datetime->greaterThan($current_datetime->copy()->setTime(23, 55));

            if ($current_datetime->between($current_datetime->copy()->setTime(8, 00), $current_datetime->copy()->setTime(20, 00)) || $is_closing_time || $settings->force_board_refresh || $is_local) {

                $count = ProductSale::count();
                $now = is_null($settings->square_parsed_at) ? Carbon::now()->startOfDay() : $settings->square_parsed_at->subSeconds(30);
                $start = $now->copy()->startOfDay();
                $cursor = null;
                $verify = !$is_local;

                do {
                    $response = Http::withOptions(compact(['verify']))->withHeaders([
                        'Authorization' => 'Bearer ' . env('SQUARE_ACCESS_TOKEN'),
                        'Content-Type' => 'application/json',
                    ])->post('https://connect.squareup.com/v2/orders/search', [
                        'location_ids' => [env('SQUARE_LOCATION_ID')],
                        "limit" => 200,
                        "cursor" => $cursor,
                        'query' => [
                            'filter' => [
                                'date_time_filter' => [
                                    'created_at' => [
                                        'start_at' => $start,
                                    ],
                                ],
                            ],
                        ],
                    ]);

                    if ($response->successful()) {
                        $data = $response->json();
                        $orders = $data['orders'] ?? null;
                        $cursor = $data['cursor'] ?? null;
                        if (is_null($orders)) {
                            if($is_local) dd('no orders');
                        } else {
                            foreach ($orders as $order) {
                                $datetime = $date = Carbon::parse($order['updated_at'])->setTimezone(config('app.timezone'));
                                $latest_is_null = is_null($last_end_of_day_update);
                                if($latest_is_null) {
                                    $can_process = true;
                                } else {
                                    $can_process = $datetime->greaterThan($last_end_of_day_update);
                                }
                                $order_state = strtolower($order['state'] ?? '');
                                if($can_process && $order_state === 'completed') {
                                    if (!ProductSale::where('square_id', $order['id'])->exists()) {
                                        foreach ($order['line_items'] ?? [] as $item) {
                                            if (str_contains(strtolower($item['name'] ?? ''), 'croissant')) {
                                                ProductSale::create([
                                                    'square_id' => $order['id'],
                                                    'date' => $now->format('ymd'),
                                                    'product_type' => 'croissant',
                                                    'sold' => intval($item['quantity'] ?? '0'),
                                                    'total_sold' => ProductSale::max('total_sold') + intval($item['quantity'] ?? '0'),
                                                ]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        Log::error('Failed to retrieve orders', $response->json());
                    }

                    unset($data, $orders, $response);
                    gc_collect_cycles();

                    sleep(1);

                } while ($cursor);

                $settings->update([
                    'square_parsed_at' => Carbon::now(),
                    'force_board_refresh' => false,
                ]);
            }

            if ($is_closing_time) {

                if (!$last_end_of_day_update || !$last_end_of_day_update->isToday()) {
                    $count = ProductSale::count();

                    if ($count > 0) {
                        $total_sold = ProductSale::max('total_sold');
                        Log::info("END OF DAY TOTAL: {$total_sold}");

                        $new_total = $settings->products_sold + $total_sold;
                        Log::info("NEW TOTAL: {$new_total}");
                        $settings->update([
                            'products_sold' => $new_total,
                            'square_parsed_at' => Carbon::now(),
                            'last_end_of_day_update' => Carbon::now(),
                        ]);

                        ProductSale::truncate();
                    }
                }
            }

            sleep(30);
        }
    }

}
