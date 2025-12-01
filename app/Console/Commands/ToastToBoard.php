<?php

namespace App\Console\Commands;

use App\Models\ProductSale;
use App\Models\Settings;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ToastToBoard extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:ttb';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    protected function getRestaurants()
    {
        // Auth
        $clientId = config('services.toast.client_id');
        $clientSecret = config('services.toast.client_secret');
        $userAccessType = config('services.toast.user_access_type');
        $apiHost = config('services.toast.api_hostname');

        $tokenHttp = Http::withHeaders([
            'Content-Type' => 'application/json',
        ]);

        if (app()->environment('local')) {
            $tokenHttp->withoutVerifying();
        }

        $tokenResponse = $tokenHttp->post("$apiHost/authentication/v1/authentication/login", [
            'clientId' => $clientId,
            'clientSecret' => $clientSecret,
            'userAccessType' => $userAccessType,
        ]);

        $tokenType = $tokenResponse->json('token.tokenType');
        $accessToken = $tokenResponse->json('token.accessToken');
        $authHeader = $tokenType . ' ' . $accessToken;

// Request connected restaurants
        $partnersHttp = Http::withHeaders([
            'Authorization' => $authHeader,
        ]);

        if (app()->environment('local')) {
            $partnersHttp->withoutVerifying();
        }

        $response = $partnersHttp->get("$apiHost/partners/v1/connectedRestaurants");

        dd($response->json());
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ini_set('memory_limit', '512M');
        $is_local = app()->environment('local');
        $verify = !$is_local;
        $exclude_words = false;

        if ($is_local) echo "starting\r\n";

        $current_datetime = \Carbon\Carbon::now();

            $settings = Settings::first();

            $last_end_of_day_update = $settings->last_end_of_day_update;

            $force_refresh = $settings->force_board_refresh || $is_local;

            if($force_refresh) Log::info('forced board refresh');

            $initial_square_day = Carbon::createFromFormat('ymd','250121')->startOfDay();
            $initial_day = Carbon::createFromFormat('ymd','250701')->startOfDay();

            $is_closing_time = $current_datetime->gt($current_datetime->copy()->setTime(23, 55));

            if ($current_datetime->between($current_datetime->copy()->setTime(6, 00), $current_datetime->copy()->setTime(20, 00)) || $is_closing_time || $force_refresh) {

                $day = strtolower($current_datetime->format('l'));
                $opening_times = $settings->{$day . '_opening_times'};
                $c1 = !is_null($opening_times);
                $c2 = false;
                if($c1) $c2 = strlen(trim($opening_times)) > 0;
                if(($c1 && $c2) || $force_refresh) {
                    $count = ProductSale::count();
//                    dd($count === 0 , $settings->products_sold === 0,1);
                    if($count === 0 && $settings->products_sold === 0) {
                        if($force_refresh) Log::info('initial day');
                        $now = $initial_day;
                        $total_sold = 0;
                    } else {
                        if(is_null($settings->toast_parsed_at)) {
                            $now = Carbon::now()->startOfDay();
                        } else {
                            $now = $settings->toast_parsed_at->subSeconds(30);
                        }
                        sleep(0.5);
                        if($count > 0) {
                            $total_sold = ProductSale::max('total_sold');
                        } else {
                            // Start with Square base number + any Toast sales
                            $total_sold = ($settings->products_sold_square ?? 0) + ($settings->products_sold ?? 0);
                        }
                    }
                    $date = $now->format('ymd');

                    $current_date = $now->copy()->startOfDay();

                    $total_sold_updated = false;

                    if ($force_refresh) Log::info("parsing toast");
                    $new_date = now()->startOfDay();
                    while ($current_date <= $new_date) {
                        if($is_local) echo "{$current_date} <= {$new_date}\r\n";
                        $current_date_formatted = $current_date->format('Ymd');
                        echo "current date: {$current_date_formatted}" . "\r\n";
                        try {
                            // TOAST REQUEST
                            $clientId = config('services.toast.client_id');
                            $clientSecret = config('services.toast.client_secret');
                            $userAccessType = config('services.toast.user_access_type');
                            $restaurantGuid = config('services.toast.restaurant_guid');
                            $apiHost = config('services.toast.api_hostname');

                            // Get access token
                            $tokenHttp = Http::withHeaders([
                                'Content-Type' => 'application/json',
                            ]);

                            if (!$verify) {
                                $tokenHttp->withoutVerifying();
                            }

                            $tokenResponse = $tokenHttp->post("$apiHost/authentication/v1/authentication/login", [
                                'clientId' => $clientId,
                                'clientSecret' => $clientSecret,
                                'userAccessType' => $userAccessType,
                            ]);

                            $tokenType = $tokenResponse->json('token.tokenType');
                            $accessToken = $tokenResponse->json('token.accessToken');
                            $authHeader = $tokenType . ' ' . $accessToken;

                            // Set up request client
                            $orderHttp = Http::withHeaders([
                                'Authorization' => $authHeader,
                                'Toast-Restaurant-External-ID' => $restaurantGuid,
                            ]);

                            if (!$verify) {
                                $orderHttp->withoutVerifying();
                            }

                            $page = 1;
                            $pageSize = 100;

                            do {
                                if ($is_local) echo "parsed: {$current_date}\r\n";

                                $response = $orderHttp->get("$apiHost/orders/v2/ordersBulk", [
                                    'businessDate' => $current_date->format('Ymd'),
                                    'page' => $page,
                                    'pageSize' => $pageSize,
                                ]);

                                $orders = $response->json();

                                $count = count($orders);

                                if($count > 0) {
                                    foreach ($orders as $order) {
                                        $void_date = $order['voidDate'];
                                        $paidDate = $order['paidDate'];
                                        $voided = $order['voided'];
                                        $completed = is_null($void_date) && !is_null($paidDate) && !$voided;
                                        if($completed) {
                                            foreach ($order['checks'] as $check) {
                                        foreach ($check['selections'] as $item) {
                                            $item_id = $item['guid'];
                                            $name = strtolower($item['displayName']);
                                            $quantity = intval($item['quantity']??0);
                                            
                                            // Check for specific croissant types
                                            $isTargetCroissant = false;
                                            $croissantType = '';
                                            
                                            if (str_contains($name, 'almond chocolate croissant')) {
                                                $isTargetCroissant = true;
                                                $croissantType = 'Almond Chocolate Croissant';
                                            } elseif (str_contains($name, 'almond croissant') && !str_contains($name, 'chocolate')) {
                                                $isTargetCroissant = true;
                                                $croissantType = 'Almond Croissant';
                                            } elseif (str_contains($name, 'ham') && str_contains($name, 'cheese') && str_contains($name, 'croissant')) {
                                                $isTargetCroissant = true;
                                                $croissantType = 'Ham & Cheese Croissant';
                                            } elseif (str_contains($name, 'croissant') && !str_contains($name, 'almond') && !str_contains($name, 'ham') && !str_contains($name, 'cheese')) {
                                                $isTargetCroissant = true;
                                                $croissantType = 'Plain Croissant';
                                            }
                                            
                                            if ($isTargetCroissant) {
                                                if(!ProductSale::where('square_id', $item_id)->exists()) {
                                                    $total_sold += $quantity;
                                                    $total_sold_updated = true;
                                                    $sale = ProductSale::create([
                                                        'square_id' => $item_id,
                                                        'date' => $date,
                                                        'product_type' => $croissantType,
                                                        'sold' => $quantity,
                                                        'total_sold' => $total_sold,
                                                    ]);
                                                    sleep(0.5);
                                                }
                                            }
                                        }
                                            }
                                        }
                                    }
                                }

                                if ($count < $pageSize) {
                                    break;
                                }

                                if ($is_local) echo "completed page {$page}\r\n";
                                $page++;

                            } while (true);
                            // END TOAST REQUEST
                        } catch (\Exception $e) {
                            $message = "An error occurred: " . $e->getMessage();
                            if ($is_local) echo "error: {$message}\r\n";
                            Log::error($message);
                        }
                        $current_date->addDay();
                        sleep(3);
                    }

                    if ($force_refresh) Log::info("finished parsing toast");

                    if ($is_local) echo "completed toast section\r\n";
                    if ($is_local) echo "starting board section\r\n";

                    if(($settings->board_script_on && $total_sold_updated) || $force_refresh) {
                        sleep(1);
                        $title_1 = "MY MOM{52}S AND MY";
                        $title_2 = 'CROISSANT CHALLENGE';
                        $target_word = 'Goal:';
                        $target_count = number_format(1000000, 0, '.',',');
                        $current_word = 'Sold:';
                        // Add Square base number for display (already included in $total_sold calculation above)
                        // $total_sold += intval($settings->products_sold_square);
                        $current_count = number_format($total_sold, 0, '.',',');
                        $diff = $current_datetime->copy()->startOfDay()->diffInDays($initial_square_day);
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
                                $message = "Failed to send message. Status code: {$writeResponse->status()}, Response: {$writeResponse->body()}";
                                if ($is_local) echo "error: {$message}\r\n";
                                Log::error($message);
                            }
                        } catch (\Exception $e) {
                            $message = "An error occurred: " . $e->getMessage();
                            if ($is_local) echo "error: {$message}\r\n";
                            Log::error($message);
                        }

                        if ($force_refresh) Log::info("updating settings");

                        $settings->update([
                            'toast_parsed_at' => Carbon::now(),
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
                            $now = \Carbon\Carbon::now();
                            $settings->update([
                                'toast_parsed_at' => $now,
                                'last_end_of_day_update' => $now,
                            ]);
                        }
                    }
                }

            }

        if ($is_local) echo "complete\r\n";
    }// end handle
}