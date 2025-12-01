<?php

namespace App\Console\Commands;

use App\Models\Settings;
use App\Models\ProductSale;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class AnalyzeSales extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:analyze-sales';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Analyze sales data from Square and Toast';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('📊 LIVE SALES ANALYSIS');
        $this->info('=====================');
        $this->newLine();

        // Get current settings
        $settings = Settings::first();

        $this->info('📅 DATE RANGES:');
        $this->info('===============');
        $this->info('Square: January 1, 2025 to July 1, 2025');
        $this->info('Toast: July 1, 2025 to today');
        $this->info('Today: ' . Carbon::now()->format('M d, Y'));
        $this->newLine();

        // Current database values
        $this->info('🗄️ CURRENT DATABASE VALUES:');
        $this->info('===========================');
        $this->info('products_sold_square: ' . number_format($settings->products_sold_square ?? 0));
        $this->info('products_sold: ' . number_format($settings->products_sold ?? 0));
        $this->info('ProductSale table total: ' . number_format(ProductSale::sum('sold')));
        $this->info('Current display total: ' . number_format(($settings->products_sold_square ?? 0) + ProductSale::sum('sold')));
        $this->newLine();

        // Square analysis
        $this->info('🔲 SQUARE RESULTS (Jan 1 - Jul 1, 2025):');
        $this->info('=========================================');

        $squareStart = Carbon::createFromFormat('Y-m-d', '2025-01-01')->startOfDay();
        $squareEnd = Carbon::createFromFormat('Y-m-d', '2025-07-01')->startOfDay();

        $this->info('Date range: ' . $squareStart->format('M d, Y') . ' to ' . $squareEnd->format('M d, Y'));

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('SQUARE_ACCESS_TOKEN'),
                'Content-Type' => 'application/json',
            ])->post('https://connect.squareup.com/v2/orders/search', [
                'location_ids' => [env('SQUARE_LOCATION_ID')],
                "limit" => 200,
                'query' => [
                    'filter' => [
                        'date_time_filter' => [
                            'created_at' => [
                                'start_at' => $squareStart->toISOString(),
                                'end_at' => $squareEnd->toISOString(),
                            ],
                        ],
                    ],
                ],
            ]);

            if ($response->successful()) {
                $orders = $response->json()['orders'] ?? [];
                $this->info('✅ Square API successful');
                $this->info('Orders found: ' . count($orders));
                
                $squareCroissants = 0;
                $squareDetails = [];
                
                foreach ($orders as $order) {
                    $orderState = strtolower($order['state'] ?? '');
                    if ($orderState === 'completed') {
                        $items = $order['line_items'] ?? [];
                        foreach ($items as $item) {
                            $itemName = strtolower($item['name'] ?? '');
                            
                            // Check for specific croissant types
                            $isTargetCroissant = false;
                            $croissantType = '';
                            
                            if (str_contains($itemName, 'almond chocolate croissant')) {
                                $isTargetCroissant = true;
                                $croissantType = 'Almond Chocolate Croissant';
                            } elseif (str_contains($itemName, 'almond croissant') && !str_contains($itemName, 'chocolate')) {
                                $isTargetCroissant = true;
                                $croissantType = 'Almond Croissant';
                            } elseif (str_contains($itemName, 'ham') && str_contains($itemName, 'cheese') && str_contains($itemName, 'croissant')) {
                                $isTargetCroissant = true;
                                $croissantType = 'Ham & Cheese Croissant';
                            } elseif (str_contains($itemName, 'croissant') && !str_contains($itemName, 'almond') && !str_contains($itemName, 'ham') && !str_contains($itemName, 'cheese')) {
                                $isTargetCroissant = true;
                                $croissantType = 'Plain Croissant';
                            }
                            
                            if ($isTargetCroissant) {
                                $quantity = intval($item['quantity'] ?? '0');
                                $squareCroissants += $quantity;
                                
                                $squareDetails[] = [
                                    'name' => $item['name'],
                                    'type' => $croissantType,
                                    'quantity' => $quantity,
                                    'date' => Carbon::parse($order['updated_at'])->format('M d, Y')
                                ];
                            }
                        }
                    }
                }
                
                $this->info('Total Square croissants: ' . number_format($squareCroissants));
                
                // Group by croissant type
                $squareByType = [];
                foreach ($squareDetails as $detail) {
                    $type = $detail['type'];
                    if (!isset($squareByType[$type])) {
                        $squareByType[$type] = 0;
                    }
                    $squareByType[$type] += $detail['quantity'];
                }
                
                $this->info('Square croissants by type:');
                foreach ($squareByType as $type => $count) {
                    $this->info("- {$type}: " . number_format($count));
                }
                
                if (count($squareDetails) > 0) {
                    $this->info('Square details (last 5):');
                    foreach (array_slice($squareDetails, -5) as $detail) {
                        $this->info("- {$detail['name']} ({$detail['type']}): {$detail['quantity']} on {$detail['date']}");
                    }
                }
                
            } else {
                $this->error('❌ Square API failed: ' . $response->status());
                $this->error('Response: ' . $response->body());
            }
            
        } catch (\Exception $e) {
            $this->error('❌ Square error: ' . $e->getMessage());
        }

        $this->newLine();

        // Toast analysis
        $this->info('🍞 TOAST RESULTS (Jul 1, 2025 - Today):');
        $this->info('========================================');

        $toastStart = Carbon::createFromFormat('Y-m-d', '2025-07-01')->startOfDay();
        $toastEnd = Carbon::now()->startOfDay();

        $this->info('Date range: ' . $toastStart->format('M d, Y') . ' to ' . $toastEnd->format('M d, Y'));

        try {
            $clientId = env('TOAST_CLIENT_ID');
            $clientSecret = env('TOAST_CLIENT_SECRET');
            $userAccessType = env('TOAST_USER_ACCESS_TYPE');
            $restaurantGuid = env('TOAST_RESTAURANT_GUID');
            $apiHost = env('TOAST_API_HOSTNAME');

            $tokenResponse = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post("$apiHost/authentication/v1/authentication/login", [
                'clientId' => $clientId,
                'clientSecret' => $clientSecret,
                'userAccessType' => $userAccessType,
            ]);

            if (!$tokenResponse->successful()) {
                $this->error('❌ Toast authentication failed: ' . $tokenResponse->status());
                $this->error('Response: ' . $tokenResponse->body());
            } else {
                $tokenData = $tokenResponse->json();
                $tokenType = $tokenData['token']['tokenType'];
                $accessToken = $tokenData['token']['accessToken'];
                $authHeader = $tokenType . ' ' . $accessToken;

                $this->info('✅ Toast authentication successful');

                $toastCroissants = 0;
                $toastDetails = [];
                $currentDate = $toastStart->copy();
                $daysProcessed = 0;

                while ($currentDate <= $toastEnd && $daysProcessed < 30) { // Limit to 30 days for performance
                    $dateFormatted = $currentDate->format('Ymd');
                    
                    $ordersResponse = Http::withHeaders([
                        'Authorization' => $authHeader,
                        'Toast-Restaurant-External-ID' => $restaurantGuid,
                    ])->get("$apiHost/orders/v2/ordersBulk", [
                        'businessDate' => $dateFormatted,
                        'page' => 1,
                        'pageSize' => 100,
                    ]);

                    if ($ordersResponse->successful()) {
                        $orders = $ordersResponse->json();
                        
                        foreach ($orders as $order) {
                            $paidDate = $order['paidDate'] ?? null;
                            $voidDate = $order['voidDate'] ?? null;
                            $voided = $order['voided'] ?? false;
                            $completed = is_null($voidDate) && !is_null($paidDate) && !$voided;

                            if ($completed && isset($order['checks'])) {
                                foreach ($order['checks'] as $check) {
                                    if (isset($check['selections'])) {
                                        foreach ($check['selections'] as $item) {
                                            $itemName = strtolower($item['displayName'] ?? '');
                                            
                                            // Check for specific croissant types
                                            $isTargetCroissant = false;
                                            $croissantType = '';
                                            
                                            if (str_contains($itemName, 'almond chocolate croissant')) {
                                                $isTargetCroissant = true;
                                                $croissantType = 'Almond Chocolate Croissant';
                                            } elseif (str_contains($itemName, 'almond croissant') && !str_contains($itemName, 'chocolate')) {
                                                $isTargetCroissant = true;
                                                $croissantType = 'Almond Croissant';
                                            } elseif (str_contains($itemName, 'ham') && str_contains($itemName, 'cheese') && str_contains($itemName, 'croissant')) {
                                                $isTargetCroissant = true;
                                                $croissantType = 'Ham & Cheese Croissant';
                                            } elseif (str_contains($itemName, 'croissant') && !str_contains($itemName, 'almond') && !str_contains($itemName, 'ham') && !str_contains($itemName, 'cheese')) {
                                                $isTargetCroissant = true;
                                                $croissantType = 'Plain Croissant';
                                            }
                                            
                                            if ($isTargetCroissant) {
                                                $quantity = intval($item['quantity'] ?? 0);
                                                $toastCroissants += $quantity;
                                                
                                                $toastDetails[] = [
                                                    'name' => $item['displayName'],
                                                    'type' => $croissantType,
                                                    'quantity' => $quantity,
                                                    'date' => $currentDate->format('M d, Y')
                                                ];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    $currentDate->addDay();
                    $daysProcessed++;
                    sleep(1); // Rate limiting
                }

                $this->info('Total Toast croissants: ' . number_format($toastCroissants));
                
                // Group by croissant type
                $toastByType = [];
                foreach ($toastDetails as $detail) {
                    $type = $detail['type'];
                    if (!isset($toastByType[$type])) {
                        $toastByType[$type] = 0;
                    }
                    $toastByType[$type] += $detail['quantity'];
                }
                
                $this->info('Toast croissants by type:');
                foreach ($toastByType as $type => $count) {
                    $this->info("- {$type}: " . number_format($count));
                }
                
                if (count($toastDetails) > 0) {
                    $this->info('Toast details (last 5):');
                    foreach (array_slice($toastDetails, -5) as $detail) {
                        $this->info("- {$detail['name']} ({$detail['type']}): {$detail['quantity']} on {$detail['date']}");
                    }
                }
            }
            
        } catch (\Exception $e) {
            $this->error('❌ Toast error: ' . $e->getMessage());
        }

        $this->newLine();

        // Summary
        $this->info('📊 SUMMARY:');
        $this->info('===========');
        $this->info('Square croissants (Jan 1 - Jul 1, 2025): ' . number_format($squareCroissants ?? 0));
        $this->info('Toast croissants (Jul 1, 2025 - Today): ' . number_format($toastCroissants ?? 0));
        $this->info('TOTAL CROISSANTS: ' . number_format(($squareCroissants ?? 0) + ($toastCroissants ?? 0)));
        $this->newLine();
        
        // Combined breakdown by type
        $this->info('🥐 BREAKDOWN BY CROISSANT TYPE:');
        $this->info('===============================');
        $allTypes = ['Plain Croissant', 'Almond Croissant', 'Almond Chocolate Croissant', 'Ham & Cheese Croissant'];
        foreach ($allTypes as $type) {
            $squareCount = 0;
            $toastCount = 0;
            
            if (isset($squareByType)) {
                $squareCount = $squareByType[$type] ?? 0;
            }
            if (isset($toastByType)) {
                $toastCount = $toastByType[$type] ?? 0;
            }
            
            $total = $squareCount + $toastCount;
            $this->info("{$type}: " . number_format($total) . " (Square: " . number_format($squareCount) . ", Toast: " . number_format($toastCount) . ")");
        }
        $this->newLine();

        $this->info('🔍 COMPARISON:');
        $this->info('==============');
        $this->info('Database products_sold_square: ' . number_format($settings->products_sold_square ?? 0));
        $this->info('Database products_sold: ' . number_format($settings->products_sold ?? 0));
        $this->info('Database ProductSale total: ' . number_format(ProductSale::sum('sold')));
        $this->info('Database display total: ' . number_format(($settings->products_sold_square ?? 0) + ProductSale::sum('sold')));
        $this->newLine();

        $this->info('💡 This shows the actual numbers from both POS systems!');
        $this->info('💡 Compare these with your manual counts to verify accuracy.');
    }
}