<?php

namespace App\Console\Commands;

use App\Models\Delivery;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PremiumSubscriptionItem;
use App\Models\Settings;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class RecurringTasksCopy extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:recurring-tasks-copy';

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

        $now = Carbon::now();

        $day = Str::lower($now->format('l'));

        $upcoming_friday = $now->copy()->next(Carbon::FRIDAY);
        $upcoming_saturday = $now->copy()->next(Carbon::SATURDAY);

        if($day === 'tuesday') {
            // email: one more day to order add-ons

        } else if($day === 'wednesday') {
            // all orders locked in

        } else if($day === 'thursday') {
            // email for friday deliveries

        } else if($day === 'friday') {
            // email for saturday deliveries

        }

        echo 'COMPLETE';

        return 0;
    }

    protected function get_subscriptions($days)
    {
        $subscriptions = collect();
        if($days === 'all') {
            $subscriptions = Subscription::whereDate('next_delivery', $upcoming_friday)
                ->orWhereDate('next_delivery', $upcoming_saturday)
                ->get();
        } else if ($days === 'friday') {
            $subscriptions = Subscription::whereDate('next_delivery', $upcoming_friday)
                ->get();
        }
        return $subscriptions;
    }

    protected function legacy_logic()
    {
        $action = 'whatever';

        // if it's thursday night, for premium users
        if($action === 'one-day-before-lock') {


            $data = $this->upcoming_subscription_data();
            $subscriptions = $data['subscriptions'];
            $subscriptions = $subscriptions->filter(function ($subscription) {
                return $subscription->has_customization == true;
            });
            foreach($subscriptions as $subscription) {
                $user = $subscription->user;
                if(!is_null($user)) {
                    $message = [];
                    $message[] = 'There is one day left until your delivery content will be locked so that we can get baking!';
                    $message[] = 'If you want to make a few changes before that, there is no better time than right now.';
                    $message[] = 'Here are the current contents of your box:';
                    foreach($user->premium_subscription_items as $item) {
                        $message[] = "{$item->product->name} ({$item->variation->name}) {$item->pivot->quantity}";
                    }
                    $this->send_notification(
                        $user,
                        "One day left if you want to select or switch box items",
                        'Hello there!',
                        $message,
                        'View your subscription',
                        route('subscription'),
                        'See you soon!',
                    );
                }
            }


            // if it's saturday night
        } else if($action === 'one-day-before-delivery') {


            $data = $this->upcoming_subscription_data();
            $subscriptions = $data['subscriptions'];
            $subscriptions = $subscriptions->filter(function ($subscription) {
                return $subscription->has_customization == true;
            });
            $settings = Settings::first();
            foreach($subscriptions as $subscription) {
                $user = $subscription->user;
                if(!is_null($user)) {
                    $message = [];
                    $message[] = 'Your subscription box will be delivered tomorrow morning!';
                    $message[] = 'Please make sure that someone will be home to open the door, as we can\'t in good conscience leave baked goods outside, there may be rain, there may be raccoons, you know how it is.';
                    $message[] = 'Don\'t hesitate to call if there is any issue.';
                    $message[] = "Our number is {$settings->our_phone_number}";
                    $this->send_notification(
                        $user,
                        "Your subscription box will be delivered tomorrow morning!",
                        'Hello there!',
                        $message,
                        'View your subscription',
                        route('subscription'),
                        'See you soon!',
                    );
                }
            }


            // if it's friday night
        } else if($action === 'two-days-before-delivery') {


            $data = $this->upcoming_subscription_data();
            $subscriptions = $data['subscriptions'];
            $datetime = $data['datetime'];
            $process = true; // set to true
            foreach($subscriptions as $subscription) {
                $plan = $subscription->plan;
                $has_customization = $plan->has_customization;
                $user = $subscription->user;
                if($process) {
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
                }

                // if process

                if($has_customization) {
                    $items = PremiumSubscriptionItem::with(['product', 'variation'])->where([
                        'user_id' => $user->id,
                    ])->get();
                } else {
                    $items = $plan->products()->with(['product', 'variation'])->get();
                }

                // if has customization

                foreach($items as $item) {
                    $data = [
                        'user_id' => $user->id,
                        'order_id' => ($process ? $order->id : 0),
                        'product_id' => $item->product_id,
                        'variation_id' => $item->variation_id,
                        'product_name' => $item->product->name,
                        'variation_name' => $item->variation->name,
                        'variation_price' => 0,
                        'quantity' => $item->quantity,
                        'amount' => 0,
                        'thumbnail' => "/images/products/{$item->variation->image}",
                    ];
                    if($process) {
                        $order_item = OrderItem::create($data);
                    }// if process
                }
            }


        }

    }

    protected function upcoming_subscription_data()
    {
        $now = Carbon::now();
        $upcoming_friday = $now->copy()->next(Carbon::FRIDAY);
        $upcoming_saturday = $now->copy()->next(Carbon::SATURDAY);
        return [
            'subscriptions' => Subscription::whereDate('next_delivery', $upcoming_friday)
                ->orWhereDate('next_delivery', $upcoming_saturday)->get(),
            'datetime' => [$upcoming_friday,$upcoming_saturday],
        ];
    }
}
