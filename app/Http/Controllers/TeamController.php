<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TeamController extends WebController
{

    public function dashboard()
    {
        return Inertia::render('Team/Dashboard');
    }

    // orders
    public function orders()
    {
        $orders = Order::with(['user', 'items', 'items.units'])->where('status', 'paid')
            ->whereIn('type', ['catering'])
            ->orderBy('datetime', 'asc')
            ->paginate(500000);

        $orders->getCollection()->makeVisible(['full_name', 'phone']);
        $paid_count = Order::where('status', 'paid')->count();
        $ready_count = Order::where('status', 'ready')->count();
        $completed_count = Order::where('status', 'completed')->count();
        $canceled_count = Order::where('status', 'canceled')->count();
        return Inertia::render('Team/Orders/Home', compact(['orders', 'paid_count', 'ready_count', 'completed_count', 'canceled_count']));
    }

    public function ordersReady()
    {
        $orders = Order::with(['user', 'items', 'items.units'])->where('status', 'ready')
            ->whereIn('type', ['catering'])
            ->orderBy('datetime', 'desc')
            ->paginate(500000);
        $orders->getCollection()->makeVisible(['full_name', 'phone']);
        $paid_count = Order::where('status', 'paid')->count();
        $ready_count = Order::where('status', 'ready')->count();
        $completed_count = Order::where('status', 'completed')->count();
        $canceled_count = Order::where('status', 'canceled')->count();
        return Inertia::render('Team/Orders/Home', compact(['orders', 'paid_count', 'ready_count', 'completed_count', 'canceled_count']));
    }

    public function ordersCompleted()
    {
        $orders = Order::with(['user', 'items', 'items.units'])->where('status', 'completed')
            ->whereIn('type', ['catering'])
            ->orderBy('datetime', 'desc')
            ->paginate(500000);
        $orders->getCollection()->makeVisible(['full_name', 'phone']);
        $paid_count = Order::where('status', 'paid')->count();
        $ready_count = Order::where('status', 'ready')->count();
        $completed_count = Order::where('status', 'completed')->count();
        $canceled_count = Order::where('status', 'canceled')->count();
        return Inertia::render('Team/Orders/Home', compact(['orders', 'paid_count', 'ready_count', 'completed_count', 'canceled_count']));
    }

    public function ordersCanceled()
    {
        $orders = Order::with(['user', 'items', 'items.units'])->where('status', 'canceled')
            ->whereIn('type', ['catering'])
            ->orderBy('datetime', 'desc')
            ->paginate(500000);
        $orders->getCollection()->makeVisible(['full_name', 'phone']);
        $paid_count = Order::where('status', 'paid')->count();
        $ready_count = Order::where('status', 'ready')->count();
        $completed_count = Order::where('status', 'completed')->count();
        $canceled_count = Order::where('status', 'canceled')->count();
        return Inertia::render('Team/Orders/Home', compact(['orders', 'paid_count', 'ready_count', 'completed_count', 'canceled_count']));
    }

    public function updateOrderStatus(Order $order, Request $request)
    {
        try {
            $order->update(['status' => $request->input('status')]);
        } catch (\Exception $e) {
//            dd($e);
            return $this->error($e->getMessage());
        }
        return $this->success(null);
    }

    public function exportOrders(Request $request)
    {
        $status = $request->get('status', null);
        $type = $request->get('type', 'catering');
        
        $query = Order::with(['user', 'items'])
            ->whereIn('type', [$type])
            ->orderBy('datetime', $status === 'paid' ? 'asc' : 'desc');

        if ($status) {
            $query->where('status', $status);
        }

        $orders = $query->get();
        $orders->makeVisible(['full_name', 'phone']);

        $filename = 'orders';
        if ($status) {
            $filename .= '-' . $status;
        }
        $filename .= '-' . now()->format('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        ];

        $callback = function() use ($orders) {
            $file = fopen('php://output', 'w');
            
            // Add UTF-8 BOM for Excel compatibility
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
            
            // Headers
            fputcsv($file, [
                'Order Number',
                'Order Type',
                'Status',
                'Customer Name',
                'User Name',
                'Email',
                'Phone',
                'Order Date',
                'Pickup/Delivery Date',
                'Amount',
                'Stripe Amount',
                'Gift Card Amount',
                'Total Items',
                'Total Quantity',
                'Items Details',
                'Notes',
                'Source',
            ]);

            // Data rows
            foreach ($orders as $order) {
                $itemsDetails = $order->items->map(function ($item) {
                    return sprintf(
                        '%s - %s (Qty: %s, Price: $%s)',
                        $item->product_name,
                        $item->variation_name ?? 'N/A',
                        $item->quantity,
                        number_format($item->variation_price ?? 0, 2)
                    );
                })->implode(' | ');

                fputcsv($file, [
                    $order->initial . $order->number,
                    $order->type,
                    $order->status,
                    $order->full_name ?? 'No name',
                    $order->user ? $order->user->name : 'Guest',
                    $order->email ?? 'no email',
                    $order->phone ?? 'no phone',
                    $order->created_at->format('Y-m-d H:i:s'),
                    $order->datetime ? $order->datetime->format('Y-m-d H:i:s') : 'N/A',
                    number_format($order->amount, 2),
                    number_format($order->amount_stripe ?? 0, 2),
                    number_format($order->amount_gift_card ?? 0, 2),
                    $order->items->count(),
                    $order->total_quantity,
                    $itemsDetails,
                    $order->notes ?? '',
                    $order->source ?? 'regular',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
    // end orders

// bakery
    public function bakery()
    {
        $items = OrderItem::with('order')->whereHas('order')->get();

        $orders = $items->pluck('order');

        $unique_dates = $orders->map(function ($order) {
            return Carbon::parse($order->datetime)->startOfDay();
        })->filter(function ($date) {
            return $date->isToday() || $date->isFuture();
        })->unique()->sort()->values();


        $dates = [];

        foreach ($unique_dates as $date) {
            $formatted_date = $date->format('m/d/Y');

            $items_for_date = $items->filter(function ($item) use ($date) {
                return Carbon::parse($item->order->datetime)->isSameDay($date);
            });

            $grouped_by_product = $items_for_date->groupBy('product_id')->map(function ($items) {
                return $items->groupBy('variation_id')->map(function ($variationItems) {
                    $firstItem = $variationItems->first();

                    // Get the variation
                    $variation = ProductVariation::find($firstItem->variation_id);

                    if(!$variation) return null;

                    if ($variation->is_box) {
                        // Handle box logic
                        $box_quantities = $variation->box_products->mapToGroups(function ($boxProduct) use ($variationItems) {
                            $total_quantity = $variationItems->sum('quantity') * $boxProduct->quantity;

                            return [
                                $boxProduct->product_id => [
                                    'variation_id' => $boxProduct->variation_id,
                                    'quantity' => $total_quantity,
                                ],
                            ];
                        });

                        // Flatten and return as an array
                        return $box_quantities->map(function ($variations, $product_id) {
                            return [
                                'product_name' => 'Box Product', // Adjust as needed
                                'variations' => collect($variations)->mapWithKeys(function ($variation) {
                                    return [$variation['variation_id'] => $variation['quantity']];
                                })->all(),
                            ];
                        });
                    }

                    $items_in_box = $variation->items ?? 1;

                    return [
                        'product_name' => $firstItem->product_name,
                        'variation_name' => $firstItem->variation_name,
                        'quantity' => $variationItems->sum(fn($item) => $item->quantity * $items_in_box),
                    ];
                })->filter();
            });


            $dates[$formatted_date] = $grouped_by_product;
        }

        return Inertia::render('Team/Bakery/Home', compact(['dates']));

    }


    public function bakery2()
    {
        // Load all items with necessary relationships
        $items = OrderItem::with(['order', 'variation.box_products'])->whereHas('order', function($q) {
            $q->whereIn('status', [
                'paid', 'ready', 'completed'
            ]);
        })->get();
        // Get unique dates (today and future)
        $unique_dates = $items->pluck('order.datetime')
            ->map(fn($datetime) => Carbon::parse($datetime)->startOfDay())
            ->filter(fn($date) => $date->isToday() || $date->isFuture())
            ->unique()
            ->sort()
            ->values();

        // Prepare grouped data by date
        $dates = $unique_dates->mapWithKeys(function ($date) use ($items) {
            $formatted_date = $date->format('m/d/Y');

            // Filter items for this date
            $items_for_date = $items->filter(fn($item) => Carbon::parse($item->order->datetime)->isSameDay($date));

            // Group by product and variation
            $grouped_by_product = $this->groupItemsByProduct($items_for_date);

            return [$formatted_date => $grouped_by_product];
        });
        return Inertia::render('Team/Bakery/Home', ['dates' => $dates]);
    }


    public function bakery3()
    {
        $orders = Order::whereIn('status', [
            'paid', 'ready', 'completed'
        ])->orderBy('datetime', 'asc')->where('datetime', '>', Carbon::now()->startOfDay())->get();

        $dates = $orders->groupBy(function ($order) {
            return $order->datetime->format('d M Y');
        })->map(function ($ordersForDate) {
            $products = [];

            foreach ($ordersForDate as $order) {
                foreach ($order->items as $item) {
                    foreach ($item->units as $unit) {
                        $productKey = $unit->product_name . '|' . $unit->variation_name;

                        if (!isset($products[$productKey])) {
                            $products[$productKey] = [
                                'product_name' => $unit->product_name,
                                'variation_name' => $unit->variation_name,
                                'quantity' => 0,
                            ];
                        }

                        $products[$productKey]['quantity'] += $unit->quantity;
                    }
                }
            }

            return array_values($products);
        });
        $special_products = [];
        foreach($orders as $order) {
            foreach($order->items as $item) {
                if(!is_null($item->client_note)) {
                    $special_products[$order->datetime->format('d M Y')][] = [
                        'number' => $order->number,
                        'product' => $item->product_name,
                        'variation' => $item->variation_name,
                        'note' => nl2br($item->client_note),
                    ];
                }
            }
        }
        return Inertia::render('Team/Bakery/Home', compact(['dates', 'special_products']));
    }

    private function groupItemsByProduct($items)
    {
        return $items->groupBy('product_id')->map(function ($items) {
            return $items->groupBy('variation_id')->flatMap(function ($variationItems) {
                return $this->processVariationItems($variationItems);
            })->filter()->values();
        });
    }



    private function processVariationItems($variationItems)
    {
        $firstItem = $variationItems->first();
        $variation = $firstItem->variation;

        if (!$variation) return null;

        $items_in_box = $variation->items ?? 1;

        // If it's a box, process its contents
        if ($variation->is_box) {
            $boxContents = $variation->box_products->map(function ($box_product) use ($variationItems) {
                $actual_product = $box_product->product;
                $actual_variation = $box_product->variation;

                if (!$actual_variation) return null;

                return [
                    'product_name' => $actual_product->name,
                    'variation_name' => $actual_variation->name,
                    'quantity' => $variationItems->sum(fn($item) => $item->quantity * $actual_variation->items),
                ];
            })->filter()->values();

            return $boxContents;
        }

        // Regular variation
        return [
            [
                'product_name' => $firstItem->product_name,
                'variation_name' => $firstItem->variation_name,
                'quantity' => $variationItems->sum(fn($item) => $item->quantity * $items_in_box),
            ],
        ];
    }



    private function processBoxVariation($variation, $variationItems)
    {
        $box_quantities = $variation->box_products->mapToGroups(function ($boxProduct) use ($variationItems) {
            $total_quantity = $variationItems->sum('quantity') * $boxProduct->quantity;

            return [
                $boxProduct->product_id => [
                    'variation_id' => $boxProduct->variation_id,
                    'quantity' => $total_quantity,
                ],
            ];
        });
        return $box_quantities->map(function ($variations, $product_id) {
            return [
                'product_name' => 'Box Product',
                'variations' => collect($variations)->mapWithKeys(function ($variation) {
                    return [$variation['variation_id'] => $variation['quantity']];
                })->all(),
            ];
        });
    }

// end bakery

}
