<?php

namespace App\Console\Commands;

use App\Models\Delivery;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PremiumSubscriptionItem;
use App\Models\Settings;
use App\Models\Subscription;
use App\Traits\Helpers;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class RecurringTasks extends Command
{

    use Helpers;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:recurring-tasks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct(); // Ensure this line is present
    }

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
            $subscriptions = $this->get_subscriptions([$upcoming_friday, $upcoming_saturday]);
            $subscriptions = $subscriptions->filter(function ($subscription) {
                return $subscription->has_customization == true;
            });
            foreach($subscriptions as $subscription) {
                $user = $subscription->user;
                if(!is_null($user)) {
                    $message = [];
                    $message[] = 'There is one day left before your delivery content needs to get locked so that we can get baking!';
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

        } else if($day === 'wednesday') {
            // all orders locked in, when payments are taken by stripe
        } else if($day === 'thursday') {
            // email for friday deliveries
            $subscriptions = $this->get_subscriptions([$upcoming_friday]);
            $this->send_delivery_notifications($subscriptions);

        } else if($day === 'friday') {
            // email for saturday deliveries
            $subscriptions = $this->get_subscriptions([$upcoming_saturday]);
            $this->send_delivery_notifications($subscriptions);

        }

        echo 'COMPLETE';

        return 0;
    }

    protected function send_delivery_notifications($subscriptions)
    {
        $settings = Settings::first();
        foreach($subscriptions as $subscription) {
            $user = $subscription->user;
            if(!is_null($user)) {
                $message = [];
                $message[] = 'Your subscription box will be delivered tomorrow morning between 7:30 and 10am!';
                $message[] = 'Please make sure that someone will be home to open the door, as we can\'t in good conscience leave baked goods outside, there may be rain, there may be raccoons.';
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
            sleep(2);
        }
    }

    protected function get_subscriptions($days)
    {
        $subscriptions = collect();
        if(count($days) === 2) {
            $subscriptions = Subscription::whereDate('next_delivery', $days[0])
                ->orWhereDate('next_delivery', $days[1])
                ->get();
        } else if(count($days) === 1) {
            $subscriptions = Subscription::whereDate('next_delivery', $days[0])
                ->get();
        }
        return $subscriptions;
    }
}
