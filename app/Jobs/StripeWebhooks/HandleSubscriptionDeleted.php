<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class HandleSubscriptionDeleted implements ShouldQueue
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
            $stripe_subscription_id = $event['data']['object']['id'];
            Log::info('job subscription deleted -----------------------');
            Log::info($stripe_subscription_id);
            $subscription = Subscription::where('stripe_subscription_id', $stripe_subscription_id)->first();

            if (!$subscription) {
                Log::warning("Subscription with Stripe ID {$stripe_subscription_id} not found.");
                return;
            }

            $stripeEventCreated = $event['created'];
            if (is_null($subscription->stripe_event_created) || $stripeEventCreated > $subscription->stripe_event_created) {
                $subscription->update([
                    'status' => 'canceled',
                    'stripe_event_created' => $stripeEventCreated,
                ]);
                $user = $subscription->user;

                $user->update([
                    'subscription_id' => null,
                    'subscription_plan_id' => null,
                    'billing_interval' => 'null',
                ]);

            }
        } catch (\Exception $e) {
            Log::error('WEBHOOK PROCESSING ERROR: ' . $e->getMessage());
        }
    }
}
