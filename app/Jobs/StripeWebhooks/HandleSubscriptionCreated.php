<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\Delivery;
use App\Models\Subscription;
use Carbon\Carbon;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class HandleSubscriptionCreated implements ShouldQueue
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
            $subscription_uid = $stripe_subscription['metadata']['subscription_uid'];
            $stripe_plan_id = $stripe_subscription['plan']['id'];
            $stripe_customer_id = $stripe_subscription['customer'];
            Log::info('job subscription created -----------------------');
            Log::info($subscription_uid);
            $stripe_subscription_id = $stripe_subscription['id'];
            $subscription = Subscription::where('uid', $subscription_uid)->first();

            if ($subscription) {
                $stripeEventCreated = $event['created'];
                if (is_null($subscription->stripe_event_created) || $stripeEventCreated > $subscription->stripe_event_created) {

                    $user = $subscription->user;

                    Log::info('we get the active subscriptions');
                    $activeSubscriptions = Subscription::where('user_id', $user->id)
                        ->where('status', '!=', 'canceled')
                        ->where('id', '!=', $subscription->id)
                        ->get();

                    Log::info('active subscriptions found: ' . $activeSubscriptions->count());

                    \Stripe\Stripe::setApiKey(config('stripe.secret_key'));

                    //active subscriptions
                    foreach ($activeSubscriptions as $activeSubscription) {
                        try {
                            if(!is_null($activeSubscription->stripe_subscription_id)) {
                                $stripeSubscription = \Stripe\Subscription::retrieve($activeSubscription->stripe_subscription_id);

                                $stripeSubscription->delete();
                            }
                            Log::info('we update the active subscription status to "canceled"');
                            $activeSubscription->update(['status' => 'canceled']);

                        } catch (Exception $e) {
                            Log::error("Failed to cancel Stripe subscription: " . $e->getMessage());
                        }
                    }//end active subscriptions

                    Log::info('we update the new subscription status to "active"');
                    $billing_period_ends = Carbon::createFromTimestamp($stripe_subscription['current_period_end']);
                    $subscription->update([
                        'status' => 'active',
                        'stripe_subscription_id' => $stripe_subscription_id,
                        'stripe_plan_id' => $stripe_plan_id,
                        'billing_period_ends' => $billing_period_ends,
                        'stripe_event_created' => $stripeEventCreated,
                    ]);
                    $user = $subscription->user;

                    Log::info('we update the user with the subscription information');
                    $user->update([
                        'stripe_id' => $stripe_customer_id,
                        'subscription_id' => $subscription->id,
                        'subscription_plan_id' => $subscription->subscription_plan_id,
                        'billing_interval' => $subscription->billing_interval,
                    ]);
                }
            } else {
                Log::warning("Subscription with UID {$subscription_uid} not found.");
            }
        } catch (\Exception $e) {
            Log::error('WEBHOOK PROCESSING ERROR: ');
            Log::error($e->getMessage());
            Log::error($e->getFile());
            Log::error($e->getLine());
        }
    }
}
