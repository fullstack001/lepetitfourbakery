<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\GiftCard;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PostCode;
use App\Models\PremiumSubscriptionItem;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\Settings;
use App\Models\Subscription;
use App\Models\SubscriptionPageContent;
use App\Models\SubscriptionPlan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\BillingPortal\Session as PortalSession;
use Stripe\Coupon;
use Stripe\Stripe;

class SubscriptionsController extends WebController
{
    public function subscription()
    {
        $plans = SubscriptionPlan::with(['products', 'variations'])
            ->where('active', true)
            ->orderBy('position')->get();
        $stripe_key = config('services.stripe.publishable_key');
        $user = auth()->user();
        $subscription_id = $user->subscription_id;
        $is_subscribed = !is_null($subscription_id);
        $subscribed_plan = null;
        $renews = false;
        $billing_period_ends = null;
        $delivery_day = '';
        $can_update_delivery_day = false;
        if($is_subscribed) {

            $subscription = $user->subscription;
            $delivery_day = $subscription->delivery_day;

            $next_delivery = $subscription->next_delivery->copy();

            $today = Carbon::now()->endOfDay();
            $tuesday_before_delivery = Carbon::parse($next_delivery)->previous(Carbon::TUESDAY)->startOfDay();
            $can_update_delivery_day = $today->lessThanOrEqualTo($tuesday_before_delivery);

            if(!is_null($subscription)) {
                $subscribed_plan = $subscription->plan;
                $renews = $subscription->renews === 1;
                if(is_null($subscription->billing_period_ends)) {
                    $billing_period_ends = '?';
                } else {
                    $billing_period_ends = $subscription->billing_period_ends->format('M d, Y');
                }
            }

        }
        $add_on_products = collect();
        if($is_subscribed) {
            $add_on_products = Product::where('in_add_ons_menu', true)
                ->where('active', true)
                ->whereHas('variations')
                ->with(['variations'])->get();
        }
        $next_available_date = $user->next_available_date_formatted;

        $phone = $user->phone;
        $full_name = $user->full_name;
        $address_1 = $user->address_1;
        $address_2 = $user->address_2;
        $post_code = $user->post_code;
        $city = $user->city;

        $premium_subscription_items = PremiumSubscriptionItem::with(['product', 'variation'])->where([
            'user_id' => $user->id,
        ])->get();

        $total_selected = $premium_subscription_items->sum('quantity');

        $selected_quantities = [];

        $variations = ProductVariation::with(['product'])->where('deleted', false)->get();

        if($total_selected > SubscriptionPlan::MAX_PRODUCTS) {
            $to_remove = $total_selected - SubscriptionPlan::MAX_PRODUCTS;
            foreach($premium_subscription_items as $premium_subscription_item) {
                $quantity = $premium_subscription_item->quantity;
                if($quantity > $to_remove) {
                    $new_quantity = $quantity - $to_remove;
                    $premium_subscription_item->update(['quantity' => $new_quantity]);
                    break;
                } else if($quantity === $to_remove) {
                    $premium_subscription_item->delete();
                    break;
                } else {
                    $to_remove = $to_remove - $quantity;
                    $premium_subscription_item->delete();
                }
            }
            return to_route('subscription');
        }

        foreach($premium_subscription_items as $item) {
            $variation = $variations->where('id', $item->variation_id)->first();
            if($variation) {
                $selected_quantities[$variation->uid] = $item->quantity;
            }
        }

        $customization_products = $plans->where('has_customization', true)
            ->first()
            ->variations
            ->groupBy(function ($variation) {
                return $variation->product->name;
            })
            ->map(function ($variations, $product_name) use($total_selected, $selected_quantities) {
                $variations->each(function ($variation) use($total_selected, $selected_quantities) {
                    $variation->possible_quantity = $variation->calculatePossibleQuantity($total_selected, ($selected_quantities[$variation->uid]??0));
                });
                return [
                    'name' => $product_name,
                    'uid' => $variations->first()->product->uid,
                    'image_url' => $variations->first()->product->image_url,
                    'variations' => $variations
                ];
            });

        $has_valid_postcode = $user->has_valid_postcode;

        $plan_variations = array();
        if($subscribed_plan) {
            $plan_variations = $subscribed_plan->variations()
                ->with('product')
                ->get()
                ->sortBy(function ($variation) {
                    return $variation->product->name;
                })->values();
        }

        $premium_subscription_item_uids = [];
        $add_on_variations = collect();
        if($is_subscribed && $subscribed_plan->has_customization) {
            $premium_subscription_item_uids = $premium_subscription_items->mapWithKeys(function ($item) {
                return [$item->variation->uid => $item->quantity];
            })->toArray();
            $add_on_variations = ProductVariation::whereHas('product', function ($query) {
                $query->where('in_add_ons_menu', true)
                    ->where('active', true);
            })
                ->with('product')
                ->get()
                ->sortBy(function ($variation) {
                    return $variation->product->name;
                });
        }

        $extra_delivery_fee = $user->extra_delivery_fee;

        $content = SubscriptionPageContent::first();
        $content->introduction = nl2br($content->introduction);
        $content->feature_1_content = nl2br($content->feature_1_content);
        $content->feature_2_content = nl2br($content->feature_2_content);
        $content->feature_3_content = nl2br($content->feature_3_content);
        $content->subscribed_instructions = nl2br($content->subscribed_instructions);
        return Inertia::render('Subscriptions/Home', compact(['content', 'plans', 'stripe_key', 'is_subscribed', 'subscribed_plan', 'renews', 'billing_period_ends', 'add_on_products', 'customization_products', 'premium_subscription_items', 'next_available_date', 'phone', 'full_name', 'address_1', 'address_2', 'post_code', 'city', 'has_valid_postcode', 'plan_variations', 'premium_subscription_item_uids', 'add_on_variations', 'extra_delivery_fee', 'delivery_day', 'can_update_delivery_day']));
    }

    public function updateDeliveryDay(Request $request)
    {
        $data = $request->validate([
            'day' => ['required', 'in:friday,saturday'],
        ]);
        $delivery_day = $data['day'];

        if($delivery_day === 'friday') {
            $carbon_day = Carbon::FRIDAY;
        } else {
            $carbon_day = Carbon::SATURDAY;
        }

        $user = auth()->user();
        $subscription = $user->subscription;
        if(is_null($subscription)) {

            return $this->error(null);

        } else {

            $next_delivery = $subscription->next_delivery;

            $today = Carbon::now()->endOfDay();
            $tuesday_before_delivery = Carbon::parse($next_delivery)->previous(Carbon::TUESDAY)->startOfDay();
            $qualifies = $today->lessThanOrEqualTo($tuesday_before_delivery);

            if($qualifies) {
                $subscription->update([
                    'delivery_day' => $delivery_day,
                ]);
            }

        }
    }

    public function createPremiumSubscriptionItem(Request $request)
    {
        try {
            $data = $request->validate([
                'uid' => ['required', 'uuid'],
                'quantity' => ['required', 'integer', 'between:0,9'],
            ]);
            $user = auth()->user();
            $variation = ProductVariation::where('uid', $data['uid'])->where('deleted', false)->first();
            if (!is_null($variation)) {
                if($data['quantity'] === 0) {
                    PremiumSubscriptionItem::where([
                        'user_id' => $user->id,
                        'product_id' => $variation->product_id,
                        'variation_id' => $variation->id,
                    ])->delete();
                } else {
                    PremiumSubscriptionItem::updateOrCreate([
                        'user_id' => $user->id,
                        'product_id' => $variation->product_id,
                        'variation_id' => $variation->id,
                    ], [
                        'quantity' => $data['quantity'],
                    ]);
                }
            }
        } catch (\Exception $e) {
            return $this->error('An error occurred');
        }
        return $this->success('The subscription item has been saved');
    }

    public function updatePremiumSubscriptionItem(PremiumSubscriptionItem $item, Request $request)
    {
        try {
            $data = $request->validate([
                'uid' => ['required', 'uuid'],
                'quantity' => ['required', 'integer', 'between:0,9'],
            ]);
            $user = auth()->user();
            $variation = ProductVariation::where('uid', $data['uid'])->where('deleted', false)->first();
            if (!is_null($variation)) {
                if($data['quantity'] === 0) {
                    PremiumSubscriptionItem::where([
                        'user_id' => $user->id,
                        'product_id' => $variation->product_id,
                        'variation_id' => $variation->id,
                    ])->delete();
                } else {
                    $same_product = $item->product_id === $variation->product_id;
                    $same_variation = $item->variation_id === $variation->id;
                    $update_item = false;
                    if($same_product && !$same_variation) {
                        $existing_item = PremiumSubscriptionItem::where([
                            'user_id' => $user->id,
                            'product_id' => $variation->product_id,
                            'variation_id' => $variation->id,
                        ])->first();
                        if($existing_item) {
                            $item->delete();
                            $existing_item->update([
                                'quantity' => $data['quantity'],
                            ]);
                        } else {
                            $item->update([
                                'product_id' => $variation->product_id,
                                'variation_id' => $variation->id,
                                'quantity' => $data['quantity'],
                            ]);
                        }
                    } else {
                        $update_item = true;
                    }
                    if($update_item) {
                        $item->update([
                            'product_id' => $variation->product_id,
                            'variation_id' => $variation->id,
                            'quantity' => $data['quantity'],
                        ]);
                    }
                }
            }
        } catch (\Exception $e) {
            return $this->error('An error occurred');
        }
        return $this->success('The subscription item has been updated');
    }

    public function updateBoxSelection(Request $request)
    {
        $data = $request->validate([
            'variations' => ['required', 'array', 'min:1'],
            'variations.*' => ['uuid'],
            'quantities' => ['required', 'array', 'min:1'],
            'quantities.*' => ['integer', 'min:1'],
        ], [
            'quantities' => function ($attribute, $value, $fail) {
                if (array_sum($value) !== 9) {
                    $fail('You must select exactly 9 items');
                }
            }
        ]);
        try {
            $user = auth()->user();
            $variations = ProductVariation::whereIn('uid', $data['variations'])->where('deleted', false)->get();
            $variation_ids = $variations->pluck('id')->toArray();
            foreach ($variations as $variation) {
                PremiumSubscriptionItem::updateOrCreate([
                    'user_id' => $user->id,
                    'product_id' => $variation->product_id,
                    'variation_id' => $variation->id,
                ], [
                    'quantity' => $data['quantities'][$variation->uid],
                ]);
            }
            PremiumSubscriptionItem::where('user_id', $user->id)->whereNotIn('variation_id', $variation_ids)->delete();
        } catch (\Exception $e) {
            return $this->error('An error occurred');
        }
        return $this->success('Your box selection has been successfully updated');
    }

    public function subscribe(Request $request)
    {
        $post_codes = PostCode::where('active', true)->pluck('post_code')->toArray();
        $data = $request->validate([
            'frequency' => ['required', 'string'],
            'delivery_day' => ['required', 'in:friday,saturday'],
            'phone' => ['required', 'string', 'min:2', 'max:100'],
            'full_name' => ['required', 'string', 'min:2', 'max:100'],
            'address_1' => ['required', 'string', 'min:2', 'max:100'],
            'address_2' => ['nullable', 'string', 'min:2', 'max:100'],
            'post_code' => ['required', 'string', 'size:5', Rule::in($post_codes)],
            'city' => ['required', 'string', 'min:2', 'max:100'],
        ],[
            'frequency.*' => 'Please select one of the three options',
            'delivery_day.*' => 'Please select one of the two options',
            'phone.*' => 'Please enter a phone number',
            'full_name.*' => 'Please enter your full name',
            'address_1.*' => 'Please enter your address',
            'address_2.*' => 'Please enter your address',
            'post_code.in' => 'This post code is outside of our delivery zone',
            'post_code.*' => 'Please enter a valid post code',
            'city.*' => 'Please enter a city',
        ]);

        $user = auth()->user();

        $user->update([
            'phone' => $data['phone']??null,
            'full_name' => $data['full_name']??null,
            'address_1' => $data['address_1']??null,
            'address_2' => $data['address_2']??null,
            'post_code' => $data['post_code']??null,
            'city' => $data['city']??null,
        ]);
        $frequency = $data['frequency'];
        $plan_uid = $request->input('plan');
        $plan = SubscriptionPlan::where('uid', $plan_uid)
            ->where('active', true)->first();
        if(is_null($plan)) {
            return response()->json(['error' => 'Subscription plan unavailable'], 400);
        }
        Stripe::setApiKey(config('services.stripe.secret_key'));

        $amount = 0;

        if ($frequency === 'monthly') {
            $amount = round(($plan->price_monthly),2);
            $interval_count = 4;
            $frequency_days = Subscription::FREQUENCY_IN_DAYS_MONTHLY;
        } else if ($frequency === 'biweekly') {
            $amount = round(($plan->price_biweekly / 2),2);
            $interval_count = 2;
            $frequency_days = Subscription::FREQUENCY_IN_DAYS_BIWEEKLY;
        } else if ($frequency === 'weekly') {
            $amount = round(($plan->price_weekly / 4),2);
            $interval_count = 1;
            $frequency_days = Subscription::FREQUENCY_IN_DAYS_WEEKLY;
        } else {
            return response()->json(['error' => 'Invalid plan specified'], 400);
        }

        if(!is_null($user->subscription_id)) {
            return response()->json(['error' => 'The user already has a subscription'], 400);
        }

        $delivery_day = $data['delivery_day'];

        if($delivery_day === 'friday') {
            $carbon_day = Carbon::FRIDAY;
        } else {
            $carbon_day = Carbon::SATURDAY;
        }

        $settings = Settings::first();
        $next_delivery_date = Carbon::now()->startOfDay()
            ->addHours($settings->min_hours_before_pickup)->next($carbon_day);

        // create subscription
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'subscription_plan_id' => $plan->id,
            'renews' => true,
            'price' => $amount,
            'billing_interval' => 'week',
            'billing_interval_count' => $interval_count,
            'frequency' => $frequency_days,
            'delivery_day' => $delivery_day,
            'next_delivery' => $next_delivery_date,
        ]);

        // create products for checkout
        $line_items = [];

        $line_items[] = [
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => 'Le Petit Four: ' . $plan->name . ' (' . $frequency . ' delivery)',
                ],
                'recurring' => [
                    'interval' => 'week',
                    'interval_count' => $interval_count,
                ],
                'unit_amount' => $amount * 100,
            ],
            'quantity' => 1,
        ];

        $extra_delivery_fee = $user->extra_delivery_fee['value'] ?? 0;
        $extra_delivery_fee_monthly = 0;
        if($extra_delivery_fee > 0) {
            if($frequency === 'monthly') {
                $extra_delivery_fee_monthly = round($extra_delivery_fee, 2);
            } else if($frequency === 'biweekly') {
                $extra_delivery_fee_monthly = round(((26 * $extra_delivery_fee) / 12), 2);
            } else if($frequency === 'weekly') {
                $extra_delivery_fee_monthly = round(((52 * $extra_delivery_fee) / 12), 2);
            }

            $line_items[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'Extra delivery fee',
                    ],
                    'recurring' => [
                        'interval' => 'month',
                    ],
                    'unit_amount' => $extra_delivery_fee_monthly * 100,
                ],
                'quantity' => 1,
            ];
        }

        $subscription_data = [
            'metadata' => [
                'subscription_uid' => $subscription->uid,
            ],
        ];

        $now  = now()->midDay();

        $days_until_wednesday = (3 - $now->dayOfWeek + 7) % 7;

        if($days_until_wednesday > 0) {
            $subscription_data['trial_period_days'] = $days_until_wednesday;
        }


        // Base parameters for creating the session
        $session_params = [
            'payment_method_types' => ['card'],
            'line_items' => $line_items,
            'mode' => 'subscription',
            'success_url' => route('checkout_success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout_error') . '?session_id={CHECKOUT_SESSION_ID}',
            'subscription_data' => $subscription_data,
        ];

        if (app()->environment('local')) {
            Stripe::setVerifySslCerts(false);
        }

        if (!is_null($user->stripe_id)) {
            try {
                $stripe_customer = \Stripe\Customer::retrieve($user->stripe_id);
                if($stripe_customer->deleted) {
                    $stripe_customer = null;
                }
            } catch (\Exception $e) {
                $stripe_customer = null;
            }
            if(is_null($stripe_customer)) {
                $session_params['customer_email'] = $user->email;
            } else {
                $session_params['customer'] = $user->stripe_id;
            }
        } else {
            $session_params['customer_email'] = $user->email;
        }

        // Create the session with the dynamically built parameters
        $session = Session::create($session_params);

        Log::info('updating subscription with id from session');
        $subscription->update(['stripe_checkout_session_id' => $session->id]);

        return response()->json(['id' => $session->id]);
    }

    public function createCustomerPortalSession()
    {

        $user = auth()->user();

        if (app()->environment('local')) {
            Stripe::setVerifySslCerts(false);
        }

        Stripe::setApiKey(config('services.stripe.secret_key'));

        $session = PortalSession::create([
            'customer' => $user->stripe_id,
            'return_url' => route('subscription'),
        ]);

        return response()->json(['url' => $session->url]);
    }

    public function addonCheckout(Request $request)
    {
        $user = auth()->user();
        $data = $request->validate([
            'addons' => ['required', 'array'],
        ]);
        $variations = ProductVariation::with(['product'])->get();
        $subscription = $user->subscription;
        $total_amount = 0;
        $items = collect();
        $line_items = [];

        // order number
        $order_number = Order::max('number')??23748923;
        $order_number = intval($order_number) + 151;

        if (app()->environment('local')) {
            Stripe::setVerifySslCerts(false);
        }

        Stripe::setApiKey(config('services.stripe.secret_key'));

        foreach($data['addons'] as $uid => $quantity) {
            $variation = $variations->where('uid', $uid)->first();
            if (!is_null($variation)) {
                $price = $variation->price;
                $amount = $price * $quantity;
                $total_amount += $amount;
                $line_items[] = [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => "{$variation->product->name} ($variation->name)",
                        ],
                        'unit_amount' => $price * 100,
                    ],
                    'quantity' => $quantity,
                ];
            }
        }

        Log::info('creating checkout session');
        $session_params = [
            'payment_method_types' => ['card'],
            'line_items' => [$line_items],
            'mode' => 'payment',
            'success_url' => route('checkout_success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout_error').'?session_id={CHECKOUT_SESSION_ID}',
            'client_reference_id' => 'A' . $order_number,
        ];

        // email
        $email = $user->email;

        if (!is_null($user->stripe_id)) {
            $session_params['customer'] = $user->stripe_id;
        } else {
            $session_params['customer_email'] = $user->email;
        }

        $session_required = true;
        $amount_stripe = 0;
        $amount_gift_card = 0;

        // gift card
        $card = null;
        if(!is_null($data['number']??null)) {
            $card = GiftCard::where('number', $data['number'])->where('email', $email)
                ->where('active', true)
                ->where('balance', '>', 0)->first();
        }
        $coupon = null;
        if(!is_null($card)) {

            $balance = $card->balance;

            if($total_amount > $balance) {
                $amount_gift_card = $balance;
                $amount_remainder = $total_amount - $balance;
                $amount_stripe = $amount_remainder;
                $coupon = Coupon::create([
                    'amount_off' => ($amount_gift_card * 100),
                    'currency' => 'usd',
                    'duration' => 'once',
                ]);
            } else {
                $amount_gift_card = $total_amount;
                $session_required = false;
            }
        } else {
            $amount_stripe = $total_amount;
        }

        $session = Session::create($session_params);

        $datetime = $user->next_available_date;


        if(!is_null($datetime)) {

            $order = Order::create([
                'user_id' => $user->id,
                'subscription_id' => $subscription->id,
                'stripe_session_id' => $session->id,
                'number' => $order_number,
                'datetime' => $datetime,
                'email' => $user->email,
                'phone' => $user->phone??'0000000000',
                'amount' => $total_amount,
                'amount_stripe' => $amount_stripe,
                'amount_gift_card' => $amount_gift_card,
                'type' => 'add-on',
            ]);

            foreach($data['addons'] as $uid => $quantity) {
                $variation = $variations->where('uid', $uid)->first();
                if(!is_null($variation)) {
                    $price = $variation->price;
                    $amount = $price * $quantity;
                    $order_item = OrderItem::create([
                        'user_id' => $user->id,
                        'order_id' => $order->id,
                        'product_id' => $variation->product_id,
                        'variation_id' => $variation->id,
                        'product_name' => $variation->product->name,
                        'variation_name' => $variation->name,
                        'variation_price' => $price,
                        'quantity' => $quantity,
                        'amount' => $amount,
                        'thumbnail' => "/images/products/{$variation->image}",
                    ]);
                    $items->push($order_item);
                }
            }
            return response()->json(['id' => $session->id, 'url' => $session->url]);
        }
        return 0;
    }
}
