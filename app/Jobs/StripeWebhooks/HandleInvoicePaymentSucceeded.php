<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\Delivery;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemUnit;
use App\Models\PremiumSubscriptionItem;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class HandleInvoicePaymentSucceeded implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $payload;

    /**
     * Create a new job instance.
     */
    public function __construct($payload)
    {
        $this->payload = $payload;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $event = $this->payload['payload'];
            $stripe_subscription = $event['data']['object'];
            $stripe_subscription_id = $stripe_subscription['parent']['subscription_details']['subscription']??'';
            if(strlen($stripe_subscription_id) > 0) {
                $subscription = Subscription::where('stripe_subscription_id', $stripe_subscription_id)->first();
                if(!is_null($subscription)) {
                    $user = $subscription->user;
                    $now = Carbon::now();
                    $upcoming_friday = $now->copy()->next(Carbon::FRIDAY);
                    $upcoming_saturday = $now->copy()->next(Carbon::SATURDAY);
                    $datetime = $subscription->delivery_day === 'friday' ? $upcoming_friday : $upcoming_saturday;
                    $delivery = Delivery::create([
                        'user_id' => $user->id,
                        'subscription_id' => $subscription->id,
                        'plan_id' => $subscription->plan_id,
                        'datetime' => $datetime,
                        'email' => $user->email,
                        'phone' => $user->phone??null,
                        'full_name' => $user->full_name??null,
                        'address_1' => $user->address_1??null,
                        'address_2' => $user->address_2??null,
                        'post_code' => $user->post_code??null,
                        'city' => $user->city??null,
                    ]);
                    $order = Order::create([
                        'user_id' => $user->id,
                        'subscription_id' => $subscription->id,
                        'delivery_id' => $delivery->id,
                        'stripe_session_id' => 'n/a',
                        'number' => '000000',
                        'datetime' => $datetime,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'amount_stripe' => 0,
                        'amount_gift_card' => 0,
                        'refunded_stripe' => 0,
                        'refunded_gift_card' => 0,
                        'amount' => 0,
                        'type' => 'subscription',
                        'status' => 'paid',
                    ]);

                    // if has customization
                    $plan = $subscription->plan;
                    $has_customization = $plan->has_customization;

                    if($has_customization) {
                        $items = PremiumSubscriptionItem::with(['product', 'variation'])->where([
                            'user_id' => $user->id,
                        ])->get();
                    } else {
                        $items = $plan->products()->with(['product', 'variation'])->get();
                    }

                    // create order items

                    foreach($items as $item) {
                        $data = [
                            'user_id' => $user->id,
                            'order_id' => $order->id,
                            'product_id' => $item->product_id,
                            'variation_id' => $item->variation_id,
                            'product_name' => $item->product->name,
                            'variation_name' => $item->variation->name,
                            'variation_price' => 0,
                            'quantity' => $item->quantity,
                            'amount' => 0,
                            'thumbnail' => "/images/products/{$item->variation->image}",
                        ];
                        $order_item = OrderItem::create($data);
                        $this->processUnits($order_item);
                    }

                    // add add-on orders to this delivery

                    $add_on_orders = Order::where('type', 'add-on')->where('status', 'paid')
                        ->where('user_id', $user->id)
                        ->whereNull('delivery_id')
                        ->get();

                    foreach($add_on_orders as $add_on_order) {
                        $add_on_order->update(['delivery_id' => $delivery->id]);
                    }


                    $next_delivery_date = null;
                    $frequency = $subscription->frequency;
                    if ($frequency === Subscription::FREQUENCY_IN_DAYS_MONTHLY) {
                        $next_delivery_date = $subscription->next_delivery->copy()->startOfDay()->addDays(Subscription::FREQUENCY_IN_DAYS_MONTHLY)->next(Carbon::SUNDAY);
                    } else if ($frequency === Subscription::FREQUENCY_IN_DAYS_BIWEEKLY) {
                        $next_delivery_date = $subscription->next_delivery->copy()->startOfDay()->addDays(Subscription::FREQUENCY_IN_DAYS_BIWEEKLY);
                    } else if ($frequency === Subscription::FREQUENCY_IN_DAYS_WEEKLY) {
                        $next_delivery_date = $subscription->next_delivery->copy()->startOfDay()->addDays(Subscription::FREQUENCY_IN_DAYS_WEEKLY);
                    }
                    if(!is_null($next_delivery_date)) {
                        $subscription->update(['next_delivery' => $next_delivery_date]);
                    }
                }
            }
        } catch (\Exception $e) {
            Log::info($e->getMessage());
        }
    }

    protected function processUnits(OrderItem $order_item): void
    {
        if($order_item->units()->count() === 0) {
            $variation = $order_item->variation;
            if(!is_null($variation)) {
                if($variation->is_box) {
                    foreach($variation->box_products as $box_product) {
                        $box_product_variation = $box_product->variation;
                        if(!is_null($box_product_variation)) {
                            $unit = OrderItemUnit::create([
                                'user_id' => $order_item->user_id,
                                'order_id' => $order_item->order_id,
                                'order_item_id' => $order_item->id,
                                'product_id' => $box_product_variation->product_id,
                                'variation_id' => $box_product_variation->id,
                                'product_name' => $box_product_variation->product->name,
                                'variation_name' => $box_product_variation->name,
                                'variation_price' => $box_product_variation->price,
                                'quantity_per_variation' => $box_product_variation->items,
                                'quantity_in_box' => $box_product->quantity,
                                'ordered_quantity' => $order_item->quantity,
                                'thumbnail' => "/images/products/{$box_product_variation->image}",
                            ]);
                        }
                    }
                } else {
                    $unit = OrderItemUnit::create([
                        'user_id' => $order_item->user_id,
                        'order_id' => $order_item->order_id,
                        'order_item_id' => $order_item->id,
                        'product_id' => $variation->product_id,
                        'variation_id' => $variation->id,
                        'product_name' => $variation->product->name,
                        'variation_name' => $variation->name,
                        'variation_price' => $variation->price,
                        'quantity_per_variation' => $variation->items,
                        'ordered_quantity' => $order_item->quantity,
                        'quantity_in_box' => 1,
                        'thumbnail' => "/images/products/{$variation->image}",
                    ]);
                }
            }
        }
    }
}
