<?php

namespace App\Console\Commands;

use App\Models\Settings;
use App\Models\ProductSale;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class ForceBoardUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:force-board-update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Force Vestaboard update with current sales data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔄 FORCING VESTABOARD UPDATE');
        $this->info('===========================');
        $this->newLine();

        // Get current settings
        $settings = Settings::first();
        
        // Get current sales data
        $currentSales = ProductSale::sum('sold');
        $squareBase = $settings->products_sold_square ?? 0;
        $totalDisplay = $squareBase + $currentSales;

        $this->info('📊 CURRENT SALES DATA:');
        $this->info('======================');
        $this->info('Square base: ' . number_format($squareBase));
        $this->info('Current Toast sales: ' . number_format($currentSales));
        $this->info('Total display: ' . number_format($totalDisplay));
        $this->newLine();

        // Force board refresh
        $settings->force_board_refresh = true;
        $settings->save();
        
        $this->info('✅ Force refresh flag set');
        $this->newLine();

        // Update Vestaboard
        try {
            $this->info('🎯 UPDATING VESTABOARD...');
            
            $current_datetime = Carbon::now();
            $initial_square_day = Carbon::createFromFormat('ymd','250121')->startOfDay();
            
            $title_1 = "MY MOM{52}S AND MY";
            $title_2 = 'CROISSANT CHALLENGE';
            $target_word = 'Goal:';
            $target_count = number_format(1000000, 0, '.',',');
            $current_word = 'Sold:';
            $current_count = number_format($totalDisplay, 0, '.',',');
            $diff = $current_datetime->copy()->startOfDay()->diffInDays($initial_square_day);
            $current_length = strlen($current_count);
            $current_position = 22 - $current_length - 6;
            $diff++;
            $day = "Day {$diff}";
            $day_length = strlen($day);
            $day_position = 22 - $day_length;
            $time = "{64}";

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

            $formatResponse = Http::post($formatUrl, $formatData);

            if (!$formatResponse->successful()) {
                $this->error('❌ Failed to format message. Status code: ' . $formatResponse->status());
                $this->error('Response: ' . $formatResponse->body());
                return 1;
            }

            // Step 2: Post formatted characters to the Vestaboard
            $writeUrl = "https://rw.vestaboard.com/";
            $headers = [
                'X-Vestaboard-Read-Write-Key' => env('VESTABOARD_API_KEY'),
                'Content-Type' => 'application/json',
            ];

            $characters = $formatResponse->json();
            $writeResponse = Http::withHeaders($headers)->post($writeUrl, $characters);

            if ($writeResponse->successful()) {
                $this->info('✅ Vestaboard updated successfully!');
                $this->info('Display total: ' . number_format($totalDisplay));
                $this->info('Day: ' . $day);
            } else {
                $this->error('❌ Failed to send message. Status code: ' . $writeResponse->status());
                $this->error('Response: ' . $writeResponse->body());
                return 1;
            }

        } catch (\Exception $e) {
            $this->error('❌ Error occurred: ' . $e->getMessage());
            return 1;
        }

        // Reset force refresh flag
        $settings->force_board_refresh = false;
        $settings->save();
        
        $this->info('✅ Force refresh flag reset');
        $this->newLine();
        $this->info('🎯 Vestaboard should now display the updated numbers!');
    }
}