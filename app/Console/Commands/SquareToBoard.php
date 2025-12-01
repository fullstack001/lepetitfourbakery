<?php

namespace App\Console\Commands;

use App\Models\ProductSale;
use App\Models\Settings;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SquareToBoard extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:squaretoboard';

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
        $exclude_words = false; // Now using specific croissant type filtering instead
        
        $current_datetime = Carbon::now();

            $settings = Settings::first();
            $last_end_of_day_update = $settings->last_end_of_day_update;

            $force_refresh = $settings->force_board_refresh || $is_local;

            if($force_refresh) Log::info('forced board refresh');

            $initial_day = Carbon::createFromFormat('ymd','250121')->startOfDay();

            $is_closing_time = $current_datetime->gt($current_datetime->copy()->setTime(23, 55));

            if ($current_datetime->between($current_datetime->copy()->setTime(8, 00), $current_datetime->copy()->setTime(20, 00)) || $is_closing_time || $force_refresh) {

                $day = strtolower($current_datetime->format('l'));
                $opening_times = $settings->{$day . '_opening_times'};
                $c1 = !is_null($opening_times);
                $c2 = false;
                if($c1) $c2 = strlen(trim($opening_times)) > 0;
                if(($c1 && $c2) || $force_refresh) {
                    $count = ProductSale::count();
                    if($count === 0 && $settings->products_sold === 0) {
                        if($force_refresh) Log::info('initial day');
                        $now = $initial_day;
                        $total_sold = 0;
                    } else {
                        if(is_null($settings->square_parsed_at)) {
                            $now = Carbon::now()->startOfDay();
                        } else {
                            $now = $settings->square_parsed_at->subSeconds(30);
                        }
                        sleep(0.5);
                        if($count > 0) {
                            $total_sold = ProductSale::max('total_sold');
                        } else {
                            $total_sold = $settings->products_sold;
                        }
                    }
                    $date = $now->format('ymd');
                    $start = $now->copy()->startOfDay();
                    $cursor = null;
                    $total_sold_updated = false;
                    $verify = !$is_local;

                    if ($force_refresh) Log::info("parsing square");

                    try {
                        do {
                            if ($force_refresh) Log::info("trying");
                            $response = Http::withOptions(compact(['verify']))->withHeaders([
                                'Authorization' => 'Bearer ' . env('SQUARE_ACCESS_TOKEN'),
                                'Content-Type' => 'application/json',
                            ])->post('https://connect.squareup.com/v2/orders/search', [
                                'location_ids' => [env('SQUARE_LOCATION_ID')],
                                "limit"=> 200,
                                "cursor"=> $cursor,
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
                                $orders = $response->json()['orders']??null;
                                $cursor = $response->json()['cursor'] ?? null;
                                if (is_null($orders)) {
                                    if($is_local) dd('no orders');
                                    if ($force_refresh) Log::info("no orders");
                                } else {
                                    $order_count = count($orders);
                                    if ($force_refresh) Log::info("order count: {$order_count}");
                                    foreach($orders as $order) {
                                        $datetime = $date = Carbon::parse($order['updated_at'])->setTimezone(config('app.timezone'));
                                        $latest_is_null = is_null($last_end_of_day_update);
                                        if($latest_is_null) {
                                            $can_process = true;
                                        } else {
                                            $can_process = $datetime->greaterThan($last_end_of_day_update);
                                        }
                                        $order_state = strtolower($order['state'] ?? '');
                                        if($can_process && $order_state === 'completed') {
                                            $order_id = $order['id'];
                                            if(!ProductSale::where('square_id', $order_id)->exists()) {
                                                $items = $order['line_items']??[];
                                                foreach($items as $item) {
                                                    $item_name = strtolower($item['name']??'');
                                                    
                                                    // Check for specific croissant types
                                                    $isTargetCroissant = false;
                                                    $croissantType = '';
                                                    
                                                    if (str_contains($item_name, 'almond chocolate croissant')) {
                                                        $isTargetCroissant = true;
                                                        $croissantType = 'Almond Chocolate Croissant';
                                                    } elseif (str_contains($item_name, 'almond croissant') && !str_contains($item_name, 'chocolate')) {
                                                        $isTargetCroissant = true;
                                                        $croissantType = 'Almond Croissant';
                                                    } elseif (str_contains($item_name, 'ham') && str_contains($item_name, 'cheese') && str_contains($item_name, 'croissant')) {
                                                        $isTargetCroissant = true;
                                                        $croissantType = 'Ham & Cheese Croissant';
                                                    } elseif (str_contains($item_name, 'croissant') && !str_contains($item_name, 'almond') && !str_contains($item_name, 'ham') && !str_contains($item_name, 'cheese')) {
                                                        $isTargetCroissant = true;
                                                        $croissantType = 'Plain Croissant';
                                                    }
                                                    
                                                    if ($isTargetCroissant) {
                                                        $item_quantity = intval($item['quantity']??'0');
                                                        $total_sold += $item_quantity;
                                                        $total_sold_updated = true;
                                                        $sale = ProductSale::create([
                                                            'square_id' => $order_id,
                                                            'date' => $date,
                                                            'product_type' => $croissantType,
                                                            'sold' => $item_quantity,
                                                            'total_sold' => $total_sold,
                                                        ]);
                                                        sleep(0.5);
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
                    } catch (\Exception $e) {
                        Log::error("An error occurred: " . $e->getMessage());
                    }

                    if ($force_refresh) Log::info("finished parsing square");

                    if(($settings->board_script_on && $total_sold_updated) || $force_refresh) {
                        sleep(1);
                        $title_1 = "MY MOM{52}S AND MY";
                        $title_2 = 'CROISSANT CHALLENGE';
                        $target_word = 'Goal:';
                        $target_count = number_format(1000000, 0, '.',',');
                        $current_word = 'Sold:';
                        $current_count = number_format($total_sold, 0, '.',',');
                        $diff = $current_datetime->copy()->startOfDay()->diffInDays($initial_day);
                        $current_length = strlen($current_count);
                        $current_position = 22 - $current_length - 6;
                        $diff++;
                        $day = "Day {$diff}";
                        $day_length = strlen($day);
                        $day_position = 22 - $day_length;
                        $time = "{64}";
                        try {
                            // Step 1: Format the components
                            $formatUrl = "https://vbml.vestaboard.com/compose";
                            $formatData = [
                                "props" => [
                                    "title_1" => "{$title_1}",
                                    "title_2" => "{$title_2}",
                                    "target_word" => "{$target_word}",
                                    "target_count" => "{$target_count}",
                                    "current_word" => "{$current_word}",
                                    "current_count" => "{$current_count}",
                                    "day" => "{$day}",
                                    "time" => "{$time}",
                                ],
                                "components" => [
                                    [
                                        "style" => [
                                            "justify" => "left",
                                            "align" => "center",
                                            "height" => 1,
                                            "width" => 22,
                                            'absolutePosition' => [
                                                "x" => 0,
                                                "y" => 0,
                                            ],
                                        ],
                                        "template" => "{{title_1}}",
                                    ],
                                    [
                                        "style" => [
                                            "justify" => "left",
                                            "align" => "center",
                                            "height" => 1,
                                            "width" => 22,
                                            'absolutePosition' => [
                                                "x" => 0,
                                                "y" => 1,
                                            ],
                                        ],
                                        "template" => "{{title_2}}",
                                    ],
                                    [
                                        "style" => [
                                            "justify" => "left",
                                            "align" => "center",
                                            "height" => 1,
                                            "width" => 5,
                                            'absolutePosition' => [
                                                "x" => 0,
                                                "y" => 3,
                                            ],
                                        ],
                                        "template" => "{{target_word}}",
                                    ],
                                    [
                                        "style" => [
                                            "justify" => "left",
                                            "align" => "center",
                                            "height" => 1,
                                            "width" => 9,
                                            'absolutePosition' => [
                                                "x" => 7,
                                                "y" => 3,
                                            ],
                                        ],
                                        "template" => "{{target_count}}",
                                    ],
                                    [
                                        "style" => [
                                            "justify" => "left",
                                            "align" => "center",
                                            "height" => 1,
                                            "width" => 5,
                                            'absolutePosition' => [
                                                "x" => 0,
                                                "y" => 4,
                                            ],
                                        ],
                                        "template" => "{{current_word}}",
                                    ],
                                    [
                                        "style" => [
                                            "justify" => "left",
                                            "align" => "center",
                                            "height" => 1,
                                            "width" => $current_length,
                                            'absolutePosition' => [
                                                "x" => $current_position,
                                                "y" => 4,
                                            ],
                                        ],
                                        "template" => "{{current_count}}",
                                    ],
                                    [
                                        "style" => [
                                            "justify" => "left",
                                            "align" => "center",
                                            "height" => 1,
                                            "width" => $day_length,
                                            'absolutePosition' => [
                                                "x" => $day_position,
                                                "y" => 5,
                                            ],
                                        ],
                                        "template" => "{{day}}",
                                    ],
                                    [
                                        "style" => [
                                            "justify" => "right",
                                            "align" => "center",
                                            "height" => 1,
                                            "width" => 1,
                                            'absolutePosition' => [
                                                "x" => 19,
                                                "y" => 1,
                                            ],
                                        ],
                                        "template" => "{{time}}",
                                    ],
                                ],
                            ];

                            $formatResponse = Http::withOptions(compact(['verify']))->post($formatUrl, $formatData);

                            if (!$formatResponse->successful()) {
                                Log::error("Failed to format message. Status code: {$formatResponse->status()}, Response: {$formatResponse->body()}");
                            }

                            // Step 2: Post formatted characters to the Vestaboard
                            $writeUrl = "https://rw.vestaboard.com/";
                            $headers = [
                                'X-Vestaboard-Read-Write-Key' => env('VESTABOARD_API_KEY'),
                                'Content-Type' => 'application/json',
                            ];

                            $characters = $formatResponse->json();
                            $writeResponse = Http::withOptions(compact(['verify']))->withHeaders($headers)->post($writeUrl, $characters);

                            if ($writeResponse->successful()) {
                            } else {
                                Log::error("Failed to send message. Status code: {$writeResponse->status()}, Response: {$writeResponse->body()}");
                            }
                        } catch (\Exception $e) {
                            Log::error("An error occurred: " . $e->getMessage());
                        }

                        if ($force_refresh) Log::info("updating settings");

                        $settings->update([
                            'square_parsed_at' => Carbon::now(),
                            'force_board_refresh' => false,
                        ]);
                    }

                }

                if ($is_closing_time) {
                    if(!$last_end_of_day_update || !$last_end_of_day_update->isToday()) {
                        $count = ProductSale::count();
                        if($count > 0) {
                            $total_sold = ProductSale::sum('sold');
                            Log::info("END OF DAY TOTAL: {$total_sold}");
                            $new_total = $settings->products_sold + $total_sold;
                            Log::info("NEW TOTAL: {$new_total}");
                            $settings->products_sold = $new_total;
                            $settings->save();
                            ProductSale::truncate();
                            $now = Carbon::now();
                            $settings->update([
                                'square_parsed_at' => $now,
                                'last_end_of_day_update' => $now,
                            ]);
                        }
                    }
                }

            }
    }
}