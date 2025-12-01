<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class HandleSubscriptionUpdated implements ShouldQueue
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
            $subscription_uid = $stripe_subscription['id'];
            Log::info('job subscription updated -----------------------');
            Log::info($subscription_uid);
            $subscription = Subscription::where('stripe_subscription_id', $subscription_uid)->first();

            if (!$subscription) {
                Log::warning("Subscription with Stripe ID {$stripe_subscription['id']} not found.");
                return;
            }

            $stripeEventCreated = $event['created'];
            if (is_null($subscription->stripe_event_created) || $stripeEventCreated > $subscription->stripe_event_created) {
                // Update billing period end
                if (isset($stripe_subscription['current_period_end'])) {
                    $subscription->billing_period_ends = Carbon::createFromTimestamp($stripe_subscription['current_period_end']);
                }

                // Update renews status
                if (isset($stripe_subscription['cancel_at_period_end'])) {
                    $subscription->renews = !$stripe_subscription['cancel_at_period_end'];
                }

                $subscription->stripe_event_created = $stripeEventCreated;
                $subscription->save();
                $user = $subscription->user;

                Log::info('we update the user with the subscription information');
                $user->update([
                    'subscription_id' => $subscription->id,
                    'subscription_plan_id' => $subscription->subscription_plan_id,
                    'billing_interval' => $subscription->billing_interval,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('WEBHOOK PROCESSING ERROR: ' . $e->getMessage());
        }
    }
}
