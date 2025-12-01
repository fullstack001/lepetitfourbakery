<?php

namespace App\Http\Controllers;

use App\Mail\OrderNotification;
use App\Models\ClosedDate;
use App\Models\Delivery;
use App\Models\GiftCard;
use App\Models\GiftCardPayment;
use App\Models\LandingModal;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Permission;
use App\Models\PostCode;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductCategoryLink;
use App\Models\ProductRefresh;
use App\Models\ProductVariation;
use App\Models\Refund;
use App\Models\Settings;
use App\Models\Subscription;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionPlanVariation;
use App\Models\SubscriptionProduct;
use App\Models\TeamMember;
use App\Models\User;
use App\Traits\Helpers;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;
use Spatie\Permission\Models\Role;
use Square\Models\CatalogObjectType;
use Square\SquareClient;
use Stripe\Stripe;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminController extends WebController
{
    use Helpers;
    protected $squareClient;

    public function __construct(SquareClient $squareClient)
    {
        $this->squareClient = $squareClient;
    }

    public function updateOrderNotes(Order $order, Request $request)
    {
        $data = $request->validate([
            'notes' => ['required', 'string'],
        ]);
        try {
            $order->update($data);
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function updateOrderDatetime(Order $order, Request $request)
    {
        $data = $request->validate([
            'date' => ['required', 'date_format:m/d/Y'],
            'time' => ['required', 'date_format:H:i'],
        ], [
            'date.*' => 'Please enter a valid date',
            'time.*' => 'Please enter a valid time',
        ]);

        try {
            $datetime = Carbon::createFromFormat('m/d/Y H:i', "{$data['date']} {$data['time']}");
            
            // Validate that the new datetime is in the future
            if ($datetime->lte(Carbon::now())) {
                throw ValidationException::withMessages([
                    'datetime' => ['The pickup date and time must be in the future.'],
                ]);
            }

            $settings = Settings::first();
            $pickup_code = $datetime->format('ymdHi');

            // Check if the new pickup time slot has availability (excluding current order)
            $existing_orders_count = Order::where('pickup_code', $pickup_code)
                ->where('id', '!=', $order->id)
                ->whereNotIn('status', ['initial', 'canceled'])
                ->count();

            if ($existing_orders_count >= $settings->max_orders_per_slot) {
                throw ValidationException::withMessages([
                    'datetime' => ['This pickup time slot has become unavailable.'],
                ]);
            }

            $order->update([
                'datetime' => $datetime,
                'pickup_code' => $pickup_code,
            ]);

            return $this->success(null);
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $this->error($e->getMessage());
        }
    }

    public function dashboard()
    {
        $can_subscribe = User::where('can_subscribe', true)->get();
        return Inertia::render('Admin/Dashboard', compact(['can_subscribe']));
    }

    public function products()
    {
        $refresh = ProductRefresh::first();
        $products = Product::where('deleted', false)->with(['variations', 'categories'])->orderBy('name')->get();
        foreach($products as $product) {
            $product->has_checkboxes = !str_starts_with($product->name, 'SUB');
        }
        $plans = SubscriptionPlan::with(['products'])->orderBy('name')->get();
        $active_plans = $plans->where('active', true);
        return Inertia::render('Admin/Products/Home', compact(['refresh', 'products', 'plans', 'active_plans']));
    }

    public function saveProductSelection(Request $request)
    {
        // active plans
        $active_plan_uids = $request->input('active_plans');
        SubscriptionPlan::whereIn('uid', $active_plan_uids)->update(['active' => true]);
        SubscriptionPlan::whereNotIn('uid', $active_plan_uids)->update(['active' => false]);
        $plans = SubscriptionPlan::get();
        $active_plans = $plans->whereIn('uid', $active_plan_uids);
        $inactive_plans = $plans->whereNotIn('uid', $active_plan_uids);
        $active_plan_ids = $active_plans->pluck('id')->toArray();
        $inactive_plan_ids = $inactive_plans->pluck('id')->toArray();
        // subscription plans
        SubscriptionProduct::whereIn('plan_id', $inactive_plan_ids)->delete();
        foreach($request->input('in_subscriptions') as $plan_uid => $product_uids) {
            $plan = SubscriptionPlan::where('uid', $plan_uid)->first();
            if(!is_null($plan)) {
                $product_ids = [];
                foreach($product_uids as $product_uid) {
                    $product = Product::where('uid', $product_uid)->first();
                    if(!is_null($product)) {
                        $product_ids[] = $product->id;
                        if(in_array($plan->id, $active_plan_ids)) {
                            SubscriptionProduct::firstOrCreate([
                                'plan_id' => $plan->id,
                                'product_id' => $product->id,
                            ]);
                        }
                    }
                }
                SubscriptionProduct::where('plan_id', $plan->id)->whereNotIn('product_id', $product_ids)->delete();
            }
        }
        // sneak peek menu
        $in_sneak_peek_menu_uids = $request->input('in_sneak_peek_menu');
        Product::whereIn('uid', $in_sneak_peek_menu_uids)->update(['in_sneak_peek_menu' => true]);
        Product::whereNotIn('uid', $in_sneak_peek_menu_uids)->update(['in_sneak_peek_menu' => false]);
        // catering menu
        $in_catering_menu_uids = $request->input('in_catering_menu');
        Product::whereIn('uid', $in_catering_menu_uids)->update(['in_catering_menu' => true]);
        Product::whereNotIn('uid', $in_catering_menu_uids)->update(['in_catering_menu' => false]);
        // add-ons
        $in_add_ons_menu_uids = $request->input('in_add_ons_menu');
        Product::whereIn('uid', $in_add_ons_menu_uids)->update(['in_add_ons_menu' => true]);
        Product::whereNotIn('uid', $in_add_ons_menu_uids)->update(['in_add_ons_menu' => false]);
        return $this->success('Success');
    }

    public function users()
    {
        $users = User::orderBy('name')->paginate(30000);
        $can_subscribe = $users->filter(function ($user) {
            return $user->can_subscribe;
        })->pluck('uid')->toArray();
        return Inertia::render('Admin/Users/Home', compact(['users', 'can_subscribe']));
    }

    public function updateSubscribers(Request $request)
    {
        try {
            $subscribers = $request->input('subscribers');
            $user = User::whereIn('uid', $subscribers)->update([
                'can_subscribe' => true,
            ]);
            $user = User::whereNotIn('uid', $subscribers)->update([
                'can_subscribe' => false,
            ]);
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    // orders
    public function orders()
    {
        $orders = Order::with(['user', 'items', 'payments', 'refunds'])
            ->whereIn('type', ['catering'])
            ->where('status', 'paid')
            ->orderBy('datetime', 'asc')
            ->paginate(500000);
        $orders->getCollection()->makeVisible(['full_name', 'phone']);
        $orders->append(['refundable_stripe', 'refundable_gift_card']);
        $paid_count = Order::where('status', 'paid')->count();
        $ready_count = Order::where('status', 'ready')->count();
        $completed_count = Order::where('status', 'completed')->count();
        $canceled_count = Order::where('status', 'canceled')->count();
        return Inertia::render('Admin/Orders/Home', compact(['orders', 'paid_count', 'ready_count', 'completed_count', 'canceled_count']));
    }

    public function ordersReady()
    {
        $orders = Order::with(['user', 'items', 'payments', 'refunds'])
            ->whereIn('type', ['catering'])
            ->where('status', 'ready')
            ->orderBy('datetime', 'desc')
            ->paginate(50000);
        $orders->getCollection()->makeVisible(['full_name', 'phone']);
        $orders->append(['refundable_stripe', 'refundable_gift_card']);
        $paid_count = Order::where('status', 'paid')->count();
        $ready_count = Order::where('status', 'ready')->count();
        $completed_count = Order::where('status', 'completed')->count();
        $canceled_count = Order::where('status', 'canceled')->count();
        return Inertia::render('Admin/Orders/Home', compact(['orders', 'paid_count', 'ready_count', 'completed_count', 'canceled_count']));
    }

    public function ordersCompleted()
    {
        $orders = Order::with(['user', 'items', 'payments', 'refunds'])
            ->whereIn('type', ['catering'])
            ->where('status', 'completed')
            ->orderBy('datetime', 'desc')
            ->paginate(50000);
        $orders->getCollection()->makeVisible(['full_name', 'phone']);
        $orders->append(['refundable_stripe', 'refundable_gift_card']);
        $paid_count = Order::where('status', 'paid')->count();
        $ready_count = Order::where('status', 'ready')->count();
        $completed_count = Order::where('status', 'completed')->count();
        $canceled_count = Order::where('status', 'canceled')->count();
        return Inertia::render('Admin/Orders/Home', compact(['orders', 'paid_count', 'ready_count', 'completed_count', 'canceled_count']));
    }

    public function ordersCanceled()
    {
        $orders = Order::with(['user', 'items', 'payments', 'refunds'])
            ->whereIn('type', ['catering'])
            ->where('status', 'canceled')
            ->orderBy('datetime', 'desc')
            ->paginate(50000);
        $orders->getCollection()->makeVisible(['full_name', 'phone']);
        $orders->append(['refundable_stripe', 'refundable_gift_card']);
        $paid_count = Order::where('status', 'paid')->count();
        $ready_count = Order::where('status', 'ready')->count();
        $completed_count = Order::where('status', 'completed')->count();
        $canceled_count = Order::where('status', 'canceled')->count();
        return Inertia::render('Admin/Orders/Home', compact(['orders', 'paid_count', 'ready_count', 'completed_count', 'canceled_count']));
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

    public function updateOrderStatus(Order $order, Request $request)
    {
        $status = $request->input('status');
        try {
            $order->update(['status' => $status]);
            if(strtolower($status) === 'ready') {
                $user = $order->user;
                $settings = Settings::first();
                $data = [
                    'order_number' => $order->number,
                    'user_name' => $user->name,
                    'user_email' => $user->email,
                    'admin_email' => env('ADMIN_EMAIL'),
                    'amount_formatted' => '$' . number_format($order->amount, 2, '.',','),
                    'date_formatted' => $order->created_at_formatted,
                    'pickup_formatted' => $order->datetime_formatted,
                    'our_address_1' => $settings->our_address_1,
                    'our_address_2' => $settings->our_address_2,
                    'our_city_postcode' => $settings->our_city_postcode,
                    'our_phone_number' => $settings->our_phone_number,
                    'items' => $order->items,
                    'custom_message' => 'Your order is ready!',
                    'is_pickup' => true,
                ];

                Mail::to($order->email)->send(new OrderNotification(
                    'Your order is ready!',
                    $data
                ));
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $this->error($e->getMessage());
        }
        return $this->success(null);
    }

    public function settings()
    {
        $settings = Settings::first();
        return Inertia::render('Admin/Settings/Home', compact(['settings']));
    }

    public function updateSettingsAddress(Request $request)
    {
        $data = $request->validate([
            'our_address_1' => ['required', 'string'],
            'our_address_2' => ['required', 'string'],
            'our_city_postcode' => ['required', 'string'],
            'our_phone_number' => ['required', 'string'],
        ]);
        try {
            $settings = Settings::first();
            $settings->update($data);
            return $this->success('Address updated');
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function updatePickupHours(Request $request)
    {
        $data = $request->validate([
            'min_hours_before_pickup' => ['required', 'integer', 'between:0,100'],
        ]);
        try {
            $settings = Settings::first();
            $settings->update($data);
            return $this->success('Value updated');
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function updateOpeningTimes(Request $request)
    {
        $data = $request->validate([
            'monday_opening_times' => ['nullable', 'string', 'max:20'],
            'tuesday_opening_times' => ['nullable', 'string', 'max:20'],
            'wednesday_opening_times' => ['nullable', 'string', 'max:20'],
            'thursday_opening_times' => ['nullable', 'string', 'max:20'],
            'friday_opening_times' => ['nullable', 'string', 'max:20'],
            'saturday_opening_times' => ['nullable', 'string', 'max:20'],
            'sunday_opening_times' => ['nullable', 'string', 'max:20'],
        ]);
        try {
            $settings = Settings::first();
            $settings->update($data);
            return $this->success('Opening times updated');
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function updateMetaTags(Request $request)
    {
        $data = $request->validate([
            'meta_description_home' => ['required', 'string','min:50', 'max:300'],
            'meta_description_boutique' => ['required', 'string','min:50', 'max:300'],
            'meta_description_catering' => ['required', 'string','min:50', 'max:300'],
            'meta_description_contact' => ['required', 'string','min:50', 'max:300'],
        ]);
        try {
            $settings = Settings::first();
            $settings->update($data);
            return $this->success('Meta descriptions updated');
        } catch (\Exception $e) {
            return $this->error(null);
        }

    }

    public function updateTimeRange(Request $request)
    {
        $data = $request->validate([
            'pickup_opening_hour' => ['required', 'integer', 'in:6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22'],
            'pickup_closing_hour' => ['required', 'integer', 'in:6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22'],
            'interval_minutes' => ['required', 'integer', 'in:5,10,15,20,25,30'],
            'max_orders_per_slot' => ['required', 'integer', 'in:2,4,6,8,10,12,14,16,18,20'],
        ]);
        try {
            $settings = Settings::first();
            $settings->update($data);
            return $this->success('Values updated');
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function updateBoardScript(Request $request)
    {
        $data = $request->validate([
            'board_script_on' => ['required', 'boolean'],
        ]);
        try {
            $settings = Settings::first();
            $settings->update($data);
            $state = $data['board_script_on'] ? 'active' : 'inactive';
            return $this->success("Board script {$state}");
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function updateFuturePickupDayCount(Request $request)
    {
        $data = $request->validate([
            'future_pickup_day_count' => ['nullable', 'integer', 'min:1'],
        ]);
        try {
            $settings = Settings::first();
            $settings->update($data);
            return $this->success('Value updated');
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function initiateRefund(Order $order, Request $request)
    {
        $data = $request->validate([
            'stripe' => ['nullable', 'numeric', 'min:5', 'max:'.$order->refundable_stripe],
            'gift_card' => ['nullable', 'numeric', 'min:1', 'max:'.$order->refundable_gift_card],
            'confirm' => ['accepted'],
        ], [
            'stripe.numeric' => 'Please enter a valid amount for the online payment refund',
            'gift_card.numeric' => 'Please enter a valid amount for the gift card refund',
            'stripe.min' => 'The minimum amount for an online payment refund is $5',
            'gift_card.min' => 'The minimum amount a gift card refund is $1',
            'stripe.max' => 'The maximum amount for an online payment refund is $' . $order->refundable_stripe,
            'gift_card.max' => 'The maximum amount a gift card refund is $' . $order->refundable_gift_card,
            'confirm.*' => 'You need to check the confirmation box',
        ]);
        $amount_stripe = $data['stripe']??0;
        $amount_gift_card = $data['gift_card']??0;
        if($amount_stripe === 0 && $amount_gift_card === 0) {
            throw ValidationException::withMessages([
                'msg' => ['Both amounts can\'t be null'],
            ]);
        }
        try {
            if($amount_stripe > 0) {
                // get the charge with the same payment intent
                $payment = Payment::where('stripe_payment_intent_id', $order->stripe_payment_intent_id)->first();
                if(is_null($payment) || (($payment->amount_captured / 100) < $amount_stripe )) {
                    throw ValidationException::withMessages([
                        'msg' => ['The online payment refund cannot be processed'],
                    ]);
                } else {
                    // initiate stripe refund
                    Stripe::setApiKey(config('services.stripe.secret_key'));
                    $stripe_refund = \Stripe\Refund::create([
                        'charge' => $payment->stripe_charge_id,
                        'amount' => ($amount_stripe * 100),
                    ]);
                    $refund = Refund::create([
                        'order_id' => $order->id,
                        'stripe_charge_id' => $payment->stripe_charge_id,
                        'amount' => ($stripe_refund->amount / 100),
                        'status' => 'succeeded',
                    ]);
                    $order->update([
                        'refunded_stripe' => ($order->refunded_stripe + $amount_stripe),
                    ]);
                }
            }
            if($amount_gift_card > 0) {
                // get the gift card payment associated with the order
                $payment = GiftCardPayment::where('stripe_payment_intent_id', $order->stripe_payment_intent_id)->first();
                if(is_null($payment) || ($payment->amount < $amount_gift_card )) {
                    throw ValidationException::withMessages([
                        'msg' => ['The gift card refund cannot be processed'],
                    ]);
                } else {
                    // initiate gift card refund
                    $card = $payment->card;
                    if(is_null($card)) {
                        throw ValidationException::withMessages([
                            'msg' => ['The gift card refund cannot be processed'],
                        ]);
                    } else {
                        $card->update([
                            'balance' => $card->balance + $amount_gift_card,
                        ]);
                        $order->update([
                            'refunded_gift_card' => ($order->refunded_gift_card + $amount_gift_card),
                        ]);
                    }
                }
            }
            return $this->success('The refund was successfully initiated');
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'msg' => $e->getMessage(),
            ]);
        }
    }
    // end orders

    // subscriptions
    public function subscriptions()
    {
        $subscriptions = Subscription::where('status', 'active')
            ->with(['user', 'user.premium_subscription_items', 'plan', 'plan.products'])
            ->orderBy('next_delivery', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(50000);

        $subscriptions->getCollection()->each(function ($subscription) {
            $subscription->user->makeVisible(['full_name', 'address_1', 'address_2', 'post_code', 'city', 'phone']);
        });

        $subscriptions->append(['delivery']);
        foreach ($subscriptions as $subscription) {
            $orders = collect();
            $items = collect();
            if($subscription->delivery) {
                $subscription->delivery->load(['orders','orders.items']);
                foreach($subscription->delivery->orders as $order) {
                    $orders->push($order);
                    foreach($order->items as $item) {
                        $items->push($item);
                    }
                }
            }
            $subscription->delivery_addon_orders = $orders;
            $subscription->delivery_addon_items = $items;
        }
        return Inertia::render('Admin/Subscriptions/Home', compact(['subscriptions']));
    }

    public function subscriptionPlans()
    {
        return Inertia::render('Admin/Subscriptions/Plans');
    }

    public function updateDeliveryAddress(Subscription $subscription, Request $request)
    {
        try {
            $post_codes = PostCode::where('active', true)->pluck('post_code')->toArray();
            $data = $request->validate([
                'phone' => ['required', 'string', 'min:2', 'max:100'],
                'full_name' => ['required', 'string', 'min:2', 'max:100'],
                'address_1' => ['required', 'string', 'min:2', 'max:100'],
                'address_2' => ['nullable', 'string', 'min:2', 'max:100'],
                'post_code' => ['required', 'string', 'size:5', Rule::in($post_codes)],
                'city' => ['required', 'string', 'min:2', 'max:100'],
            ], [
                'phone.*' => 'Please enter a phone number',
                'full_name.*' => 'Please enter a full name',
                'address_1.*' => 'Please enter an address',
                'address_2.*' => 'Please enter an address',
                'post_code.in' => 'This post code is outside of our delivery zone',
                'post_code.*' => 'Please enter a valid post code',
                'city.*' => 'Please enter a city',
            ]);
            $user = $subscription->user;
            if (!is_null($user)) {
                $user->update($data);
                $delivery = $subscription->delivery;
                if (!is_null($delivery)) {
                    $delivery->update($data);
                }
            }
            return $this->success('The user and delivery have been updated');
        } catch (\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateSubscriptionStatus(Subscription $subscription, Request $request)
    {
        return $this->error('subscription updating has moved');
        $data = $request->validate([
            'delivered' => ['required', 'boolean'],
        ]);
        try {
            $frequency = $subscription->frequency;
            if ($frequency === Subscription::FREQUENCY_IN_DAYS_MONTHLY) {
                $next_delivery_date = $subscription->next_delivery->copy()->startOfDay()->addDays(Subscription::FREQUENCY_IN_DAYS_MONTHLY)->next(Carbon::SUNDAY);
            } else if ($frequency === Subscription::FREQUENCY_IN_DAYS_BIWEEKLY) {
                $next_delivery_date = $subscription->next_delivery->copy()->startOfDay()->addDays(Subscription::FREQUENCY_IN_DAYS_BIWEEKLY);
            } else if ($frequency === Subscription::FREQUENCY_IN_DAYS_WEEKLY) {
                $next_delivery_date = $subscription->next_delivery->copy()->startOfDay()->addDays(Subscription::FREQUENCY_IN_DAYS_WEEKLY);
            }
            $subscription->update(['next_delivery' => $next_delivery_date]);
            $delivery = $subscription->delivery;
            $delivery->update(['status' => 'completed']);// create delivery
            $user = $subscription->user;
            $delivery = Delivery::create([
                'user_id' => $user->id,
                'subscription_id' => $subscription->id,
                'plan_id' => $subscription->plan_id,
                'datetime' => $next_delivery_date,
                'email' => $user->email,
                'phone' => $user->phone,
                'full_name' => $user->full_name,
                'address_1' => $user->address_1,
                'address_2' => $user->address_2,
                'post_code' => $user->post_code,
                'city' => $user->city,
            ]);
            $orders = Order::where('subscription_id', $subscription->id)
                ->where('type', 'add-on')
                ->whereDate('datetime', $next_delivery_date)->get();
            if(!is_null($orders)) {
                foreach($orders as $order) {
                    $order->update([
                        'delivery_id' => $delivery->id,
                    ]);
                }
            }
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'msg' => [$e->getMessage()],
            ]);
        }
        return $this->success(null);
    }
    // end subscriptions

    // team
    public function team()
    {
        $members = TeamMember::with(['user'])
            ->orderBy('permission', 'desc')
            ->orderBy('name')
            ->get();
        $admins = User::role(Permission::ADMIN)->whereNot('email','dev@lepetitfourbakery.com')->get();
        foreach($admins as &$admin) {
            $admin->can_be_removed = !in_array($admin->email,['dev@lepetitfourbakery.com', 'romain@lepetitfourbakery.com', 'valerie@lepetitfourbakery.com']);
        }
        return Inertia::render('Admin/Team/Members', compact(['members', 'admins']));
    }

    public function searchUser(Request $request, $type = 'team')
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
        ],[
            'email.*' => 'Please enter a valid email address',
        ]);
        $email = $data['email'];
        $emails = ['dev@lepetitfourbakery.com', 'romain@lepetitfourbakery.com', 'valerie@lepetitfourbakery.com'];
        $user = User::where('email', $email)->first();
        $exists = 'false';
        if($type === 'team') {
            if($user) {
                if(TeamMember::where('user_id', $user->id)->exists() || in_array($email,$emails)) {
                    $exists = 'true';
                    $message = 'This user is already a team member.';
                } else {
                    $message = "User found: $user->name. Save to add the user as a team member.";
                }
            } else {
                $message = 'No user found with this email address. Save to create the user and add as a team member.';
            }
        } else if($type === 'admin') {
            if($user) {
                if($user->hasRole(Permission::ADMIN)) {
                    $exists = 'true';
                    $message = 'This user is already an admin.';
                } else {
                    $message = "User found: $user->name. Save to add the user as an admin.";
                }
            } else {
                $message = 'No user found with this email address. Save to create the user and add as admin.';
            }
        } else {
            return response()->json([]);
        }
        $data = compact(['exists', 'message']);
        return response()->json($data);
    }

    public function createAdmin(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'make_admin' => ['required', 'boolean', 'accepted'],
        ]);
        try {
            $email = $data['email'];
            $user = User::where('email', $email)->first();
            if (is_null($user)) {
                $password = Str::random(rand(28, 34)) . ' ' . Str::random(rand(28, 34));
                $user = User::create([
                    'name' => strtolower(explode('@', $email)[0]),
                    'email' => $email,
                    'password' => Hash::make($password),
                    'email_verified_at' => Carbon::now(),
                ]);
            }
            if (!$user->hasRole(Permission::ADMIN)) {
                $user->assignRole(Permission::ADMIN);
            }
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function revokeAdmin(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);
        try {
            $email = $data['email'];
            $user = User::where('email', $email)->first();
            if(!is_null($user)) {
                if ($user->hasRole(Permission::ADMIN)) {
                    $user->removeRole(Permission::ADMIN);
                }
                return $this->success(null);
            }
            return $this->error(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function createTeamMember(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'name' => ['nullable', 'string', 'min:3', 'max:50'],
            'permission' => ['required', 'string', 'in:front,baker'],
        ],[
            'email.*' => 'Please enter a valid email address',
            'name.*' => 'Please enter a valid email name',
            'permission.*' => 'Please select a permission',
        ]);

        try {
            $email = $data['email'];
            if (strlen($data['name']) > 0) {
                $name = $data['name'];
            } else {
                $name = strtolower(explode('@', $email)[0]);
            }
            $permission = $data['permission'];// create permissions
            $front_permission = Permission::firstOrCreate([
                'name' => Permission::FRONT, 'guard_name' => 'web']);
            $baker_permission = Permission::firstOrCreate([
                'name' => Permission::BAKER, 'guard_name' => 'web']);// assign permissions
            $front_role = Role::firstOrCreate(['name' => Permission::FRONT, 'guard_name' => 'web']);
            $baker_role = Role::firstOrCreate(['name' => Permission::BAKER, 'guard_name' => 'web']);
            $front_role->givePermissionTo($front_permission);
            $baker_role->givePermissionTo($baker_permission);
            $user = User::where('email', $email)->first();
            if (is_null($user)) {
                $password = Str::random(rand(28, 34)) . ' ' . Str::random(rand(28, 34));
                $user = User::create([
                    'name' => strtolower(explode('@', $email)[0]),
                    'email' => $email,
                    'password' => Hash::make($password),
                    'email_verified_at' => Carbon::now(),
                ]);
            }
            if (TeamMember::where('user_id', $user->id)->exists() || in_array($email, ['dev@lepetitfourbakery.com', 'romain@lepetitfourbakery.com', 'valerie@lepetitfourbakery.com'])) {

            } else {
                $team_member = TeamMember::create([
                    'user_id' => $user->id,
                    'name' => $name,
                    'permission' => $permission,
                ]);


                // assign roles
                if ($permission === 'front') {
                    if ($user->hasRole(Permission::BAKER)) {
                        $user->removeRole(Permission::BAKER);
                    }
                    if (!$user->hasRole(Permission::FRONT)) {
                        $user->assignRole(Permission::FRONT);
                    }
                } else if ($permission === 'baker') {
                    if ($user->hasRole(Permission::FRONT)) {
                        $user->removeRole(Permission::FRONT);
                    }
                    if (!$user->hasRole(Permission::BAKER)) {
                        $user->assignRole(Permission::BAKER);
                    }
                }
            }
            return $this->success('The team member was successfully created');
        } catch (\Exception $e) {
            return $this->error($e->getMessage());
        }
    }

    public function updateTeamMember(TeamMember $member, Request $request)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'min:3', 'max:50'],
            'permission' => ['required', 'string', 'in:front,baker'],
        ],[
            'name.*' => 'Please enter a valid email name',
            'permission.*' => 'Please select a permission',
        ]);
        $name = $data['name'];
        if(strtolower($name) === 'remove user') {
            $user = $member->user;
            $member->delete();
            if ($user->hasRole(Permission::FRONT)) {
                $user->removeRole(Permission::FRONT);
            }
            if ($user->hasRole(Permission::BAKER)) {
                $user->removeRole(Permission::BAKER);
            }
            return $this->success('The user was successfully deleted');
        } else {
            $permission = $data['permission'];// create permissions
            $member->update([
                'permission' => $permission,
                'name' => $name,
            ]);
            $front_permission = Permission::firstOrCreate([
                'name' => Permission::FRONT, 'guard_name' => 'web']);
            $baker_permission = Permission::firstOrCreate([
                'name' => Permission::BAKER, 'guard_name' => 'web']);// assign permissions
            $front_role = Role::firstOrCreate(['name' => Permission::FRONT, 'guard_name' => 'web']);
            $baker_role = Role::firstOrCreate(['name' => Permission::BAKER, 'guard_name' => 'web']);
            $front_role->givePermissionTo($front_permission);
            $baker_role->givePermissionTo($baker_permission);
            $user = $member->user;
            // assign roles
            if ($permission === 'front') {
                if ($user->hasRole(Permission::BAKER)) {
                    $user->removeRole(Permission::BAKER);
                }
                if (!$user->hasRole(Permission::FRONT)) {
                    $user->assignRole(Permission::FRONT);
                }
            } else if ($permission === 'baker') {
                if ($user->hasRole(Permission::FRONT)) {
                    $user->removeRole(Permission::FRONT);
                }
                if (!$user->hasRole(Permission::BAKER)) {
                    $user->assignRole(Permission::BAKER);
                }
            }
        }
    }
    // end team

    // gift cards
    public function cards()
    {
        $cards = GiftCard::orderBy('created_at')->paginate(50000);
        return Inertia::render('Admin/Cards/Home', compact(['cards']));
    }

    public function updateCard(GiftCard $card, Request $request)
    {

    }
    // end gift cards

    // payments
    public function payments()
    {
        $payments = Payment::with('orders')->orderBy('created_at', 'desc')->paginate(50000);
        return Inertia::render('Admin/Payments/Home', compact(['payments']));
    }

    // end payments

    // post codes
    public function postCodes()
    {
        $post_codes = PostCode::orderBy('post_code')->get();
        return Inertia::render('Admin/PostCodes/Home', compact(['post_codes']));
    }

    public function createPostCode(Request $request)
    {
        $data = $request->validate([
            'post_code' => ['required', 'string', 'size:5'],
            'extra_fee' => ['required', 'numeric'],
            'active' => ['required', 'in:0,1'],
        ]);
        try {
            $data['extra_fee'] = doubleval($data['extra_fee']);
            $data['active'] = $data['active'] === 1;
            $post_code = PostCode::create($data);
        } catch (\Exception $e) {
            return $this->error(null);
        }
        return $this->success(null);
    }

    public function updatePostCode(PostCode $post_code, Request $request)
    {
        $data = $request->validate([
            'post_code' => ['required', 'string', 'size:5'],
            'extra_fee' => ['required', 'numeric'],
            'active' => ['required', 'in:0,1'],
        ]);
        try {
            $data['extra_fee'] = doubleval($data['extra_fee']);
            $data['active'] = $data['active'] === 1;
            $post_code->update($data);
        } catch (\Exception $e) {
            return $this->error(null);
        }
        return $this->success(null);
    }
    // end post codes

    // closed dates
    public function closedDates(Request $request)
    {
        $now = Carbon::now()->startOfDay();
        if(($request->scope??null) === 'all') {
            $closed_dates = ClosedDate::orderBy('datetime', 'desc')
                ->get();
            $earlier_dates_exist = false;
            $earlier_dates_displayed = true;
        } else {
            $closed_dates = ClosedDate::whereDate('datetime', '>=', $now)
                ->orderBy('datetime', 'desc')
                ->get();
            $earlier_dates_exist = ClosedDate::whereDate('datetime', '<', $now)
                ->orderBy('datetime', 'desc')
                ->exists();
            $earlier_dates_displayed = false;
        }
        return Inertia::render('Admin/ClosedDates/Home', compact(['closed_dates', 'earlier_dates_exist', 'earlier_dates_displayed']));
    }

    public function createClosedDate(Request $request)
    {
        $data = $request->validate([
            'dates' => ['required', 'array', 'min:1'],
            'reason' => ['nullable', 'string'],
        ]);
        try {
            foreach ($data['dates'] as $date) {
                $date = Carbon::createFromFormat('m.d.Y', $date)->startOfDay();
                $closed_date = ClosedDate::whereDate('datetime', $date)->first();
                if (is_null($closed_date)) {
                    ClosedDate::create([
                        'datetime' => $date,
                        'reason' => ($data['reason'] ?? null),
                    ]);
                } else {
                    $closed_date->update([
                        'reason' => ($data['reason'] ?? null),
                    ]);
                }
            }
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function deleteClosedDate(ClosedDate $closed_date, Request $request)
    {
        try {
            $closed_date->delete();
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }
    // end closed dates

    public function landingModal()
    {
        $landing_modal = LandingModal::first();
        $active = false;
        $now = Carbon::now()->midDay();
        $begin = $landing_modal->active_begin_date;
        $end = $landing_modal->active_end_date;
        if(!is_null($begin)) {
            if($now > $begin->startOfDay()) {
                if(is_null($end) || $now < $end->endOfDay()) {
                    $active = true;
                }
            }
        }
        return Inertia::render('Admin/LandingModal/Home', compact(['landing_modal', 'active']));
    }

    public function saveLandingModalContents(Request $request)
    {
        $data = $request->validate([
            'generate_new_code' => ['required', 'boolean'],
            'title_top' => ['nullable', 'string'],
            'content_top' => ['nullable', 'string'],
            'title_bottom' => ['nullable', 'string'],
            'content_bottom' => ['nullable', 'string'],
            'image_upload' => ['nullable', 'image', 'mimes:jpg,png','max:10000'],
            'opacity' => ['required', 'numeric', 'between:0,1'],
            'delay_seconds' => ['required', 'integer'],
            'active_begin_date' => ['nullable', 'date'],
            'active_end_date' => ['nullable', 'date'],
            'show_newsletter_form' => ['nullable', 'boolean'],
        ]);
        try {
            $timestamp = now()->timestamp;
            $landing_modal = LandingModal::first();
            if($data['generate_new_code']) {
                $code = strval($timestamp);
            } else {
                $code = $landing_modal->code;
            }
            $data['code'] = $code;
            if(!is_null($landing_modal)) {

                // dates processing
                if(empty($data['active_begin_date']??null)) {
                    $data['active_begin_date'] = null;
                    $data['active_end_date'] = null;
                } else {
                    $data['active_begin_date'] = Carbon::parse($data['active_begin_date']);
                    if(!empty($data['active_end_date']??null)) {
                        $data['active_end_date'] = Carbon::parse($data['active_end_date']);
                    }
                }
                // end dates processing

                // image processing
                $image_name = $code . strval(rand(1000,9999));
                $directoryPath = public_path("storage/assets/images/landing");
                if (!File::exists($directoryPath)) {
                    File::makeDirectory($directoryPath, 0755, true);
                }

                if(!empty($data["image_upload"])) {
                    $filename = "$image_name.jpg";
                    $file = $data["image_upload"];
                    $tmpFilePath = $file->getRealPath();
                    $image = Image::read($tmpFilePath);
                    if(($image->width() * 2) >= $image->height()) {
                        $image->scale(height: 600);
                        if($image->width() < 1200) {
                            $image->scale(width: 1200);
                        }
                    } else {
                        $image->scale(width: 1200);
                        if($image->height() < 600) {
                            $image->scale(height: 600);
                        }
                    }
                    $image->crop(
                        width: 1200,
                        height: 600,
                        position: 'center',
                    );
                    $filepath = "{$directoryPath}/{$filename}";
                    $image->save($filepath);
                    $data['image'] = $filename;
                }
                // end image processing

                $landing_modal->update($data);
                return $this->success('Landing modal information updated successfully');
            }
            return $this->error(null);
        } catch (\Exception $e) {
            dd($e);
            return $this->error(null);
        }
    }

    public function updateProductsSold (Request $request)
    {
        $data = $request->validate([
            'products_sold' => ['required', 'integer','min:0'],
        ]);
        try {
            $settings = Settings::first();
            $settings->update($data);
            return $this->success('Value updated');
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function deliveries(Request $request)
    {
        $selected_status = $request->status??'initial';
        if(!in_array($selected_status,['initial', 'completed', 'canceled'])) $selected_status = 'initial';
        $deliveries = Delivery::with(['subscription'])->where('status', $selected_status)
            ->orderBy('datetime')
            ->paginate(1000);
        return Inertia::render('Admin/Subscriptions/Deliveries', compact(['deliveries', 'selected_status']));
    }

    public function openDelivery(Delivery $delivery)
    {
        $orders = $delivery->orders()->with(['items'])->get();
        $data = [
            'delivery' => $delivery,
            'orders' => $orders,
        ];
        return response()->json($data);
    }

    public function updateDelivery(Delivery $delivery, Request $request)
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'in:initial,completed,canceled'],
        ]);
        try {
            $delivery->update($data);
            if($data['status'] === 'initial') {
                Order::where('subscription_id', $delivery->subscription_id)->update(['status' => 'paid']);
            } else if($data['status'] === 'completed') {
                Order::where('subscription_id', $delivery->subscription_id)->update(['status' => 'completed']);
            } else if($data['status'] === 'canceled') {
                Order::where('subscription_id', $delivery->subscription_id)->update(['status' => 'paid']);
            }
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function getAvailableProducts()
    {
        $products = Product::with(['categories', 'variations'])
            ->where('deleted', false)
            ->orderBy('name')
            ->get();
        return response()->json([
            'products' => $products,
        ]);
    }

    public function getPickupDates(Request $request)
    {
        $data = $request->validate([
            'products' => ['required', 'array', 'min:1'],
        ]);
        $settings = Settings::first();
        $today = Carbon::now()->startOfDay()->addHours($settings->pickup_opening_hour);
        $time_instance = $today->copy();
        $last_time_instance = $today->copy()->setHour($settings->pickup_closing_hour);
        $available_times = collect();
        while($time_instance < $last_time_instance) {
            $available_times->push([
                'displayed_time' => $time_instance->format('H:i'),
                'pickup_code' => $time_instance->format('ymdHi'),
                'available' => false,
            ]);
            $time_instance->addMinutes($settings->interval_minutes);
        }
        $first_day = $today->copy()->addHours($settings->min_hours_before_pickup);
        $day_format = 'm/d/Y';
        $first_day_string = $first_day->format($day_format);
        $last_day = $first_day->copy()->addDays(9);
        $period = CarbonPeriod::create($first_day, $last_day);
        $quick_days = collect();

        // closed dates
        $closed_dates = ClosedDate::whereDate('datetime', '>=', $today)
            ->orderBy('datetime', 'desc')
            ->get();

        $uids = array_keys($data['products']);

        $weekend_variations_count = ProductVariation::whereIn('uid', $uids)
            ->whereHas('product', function($q) {
                $q->where('weekend_only', true);
            })->count();

        $is_weekend_only = $weekend_variations_count > 0;

        // pickup dates
        $first_pickup_date = $first_day->copy();
        $future_pickup_day_count = $settings->future_pickup_day_count;
        if(is_null($future_pickup_day_count)) {
            $last_pickup_date = $today->copy()->addDays(365);
        } else {
            $last_pickup_date = $today->copy()->addDays($future_pickup_day_count);
        }

        foreach($period as $day) {
            $closed = false;
            $is_weekend = $day->isWeekend();
            foreach ($closed_dates as $closed_date) {
                if ($day->isSameDay($closed_date->datetime)) {
                    $closed = true;
                    break;
                }
            }
            if(!$closed) {
                if($is_weekend_only && !$is_weekend) {
                    $closed = true;
                }
            }
            if(!$closed) {
                if($day->endOfDay() <= $last_pickup_date->endOfDay()) {
                    $quick_days->push([
                        'day' => $day->format('D'),
                        'date' => $day->format('M d'),
                        'selection' => $day->format($day_format),
                    ]);
                }
            }
        }

        $data = [
            'quick_days' => $quick_days,
            'first_day_string' => $first_day_string,
            'closed_dates' => $closed_dates,
            'first_pickup_date' => $first_pickup_date,
            'last_pickup_date' => $last_pickup_date,
            'is_weekend_only' => $is_weekend_only,
        ];

        return response()->json($data);
    }

    public function getPickupTimes(Request $request)
    {
        $data = $request->validate([
            'date' => ['required', 'date_format:m/d/Y'],
        ]);

        $date = Carbon::createFromFormat('m/d/Y', $data['date'])->midDay();
        $settings = Settings::first();
        $today = Carbon::now()->startOfDay()->addHours($settings->pickup_opening_hour);
        $time_instance = $today->copy();
        $last_time_instance = $today->copy()->setHour($settings->pickup_closing_hour);
        $available_times = collect();
        $active_orders = Order::whereNotIn('status',[
            'initial', 'canceled',
        ])->get();
        while($time_instance < $last_time_instance) {
            $pickup_code = $date->format('ymd') . $time_instance->format('Hi');
            $available = $active_orders->where('pickup_code', $pickup_code)->count() < $settings->max_orders_per_slot;
            $available_times->push([
                'displayed_time' => $time_instance->format('H:i'),
                'pickup_code' => $pickup_code,
                'available' => $available,
            ]);
            $time_instance->addMinutes($settings->interval_minutes);
        }
        $data = compact('available_times');
        return response()->json($data);
    }

    public function createCustomOrder(Request $request)
    {
        $data = $request->validate([
            'full_name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'string', 'min:7'],
            'date' => ['required', 'date_format:m/d/Y'],
            'time' => ['required', 'date_format:H:i'],
            'notes' => ['nullable', 'string'],
            'quantities' => ['required', 'array', 'min:1'],
        ]);
        try {
            $user = User::where('email', $data['email'])->first();
            $user_id = is_null($user) ? null : $user->id;
            $order_number = Order::max('number')??23748923;
            $order_number = intval($order_number) + 151;

            $datetime = Carbon::createFromFormat('m/d/Y H:i', "{$data['date']} {$data['time']}");

            $settings = Settings::first();

            $pickup_code = $datetime->format('ymdHi');

            if(Order::where('pickup_code',$pickup_code)
                    ->whereNotIn('status',[
                        'initial', 'canceled',
                    ])
                    ->count() >= $settings->max_orders_per_slot) {
                throw ValidationException::withMessages([
                    'msg' => ['This pickup time slot has become unavailable'],
                ]);
            }

            $full_name = $data['full_name'];
            $email = $data['email'];
            $phone = $data['phone'];
            $notes = $data['notes'];

            // create order
            $order = Order::create([
                'user_id' => $user_id,
                'stripe_session_id' => 'n/a',
                'number' => $order_number,
                'datetime' => $datetime,
                'full_name' => $full_name,
                'email' => $email,
                'phone' => $phone??'0000000000',
                'amount' => 0,
                'amount_stripe' => 0,
                'amount_gift_card' => 0,
                'pickup_code' => $pickup_code,
                'status' => 'initial',
                'notes' => $notes,
                'source' => 'custom',
            ]);
            $total_amount = 0;
            foreach($data['quantities'] as $uid => $quantity) {
                $variation = ProductVariation::where('uid', $uid)->first();
                if($variation) {
                    $price = $variation->price;
                    $amount = $price * $quantity;
                    $total_amount += $amount;
                    $data = [
                        'user_id' => $user_id,
                        'order_id' => $order->id,
                        'product_id' => $variation->product_id,
                        'variation_id' => $variation->id,
                        'product_name' => $variation->product->name,
                        'variation_name' => $variation->name,
                        'variation_price' => $price,
                        'quantity' => $quantity,
                        'amount' => $amount,
                        'thumbnail' => "/images/products/{$variation->image}",
                    ];
                    $order_item = OrderItem::create($data);
                    $this->processUnits($order_item);
                }
            }

            $order->update([
                'status' => 'paid',
                'amount' => $total_amount,
            ]);
            return $this->success(null);
        } catch (\Exception $e) {
            dd($e); // todo remove
            return $this->error(null);
        }
    }

    public function updateCustomOrder(Order $order, Request $request)
    {
        return $this->success(null);
    }

}
