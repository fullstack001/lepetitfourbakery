<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\GiftCardOrder;
use App\Models\GiftCardPayment;
use App\Models\Order;
use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class HandleCheckoutSessionExpired implements ShouldQueue
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
            $stripe_session_id = $event['data']['object']['id'];
            $customer_stripe_id = $event['data']['object']['customer'];
            $client_reference_id = $event['data']['object']['client_reference_id'];

            Log::info('job checkout session expired -----------------------');
            Log::info($stripe_session_id);
            Log::info($client_reference_id);

            $order = null;
            $char = substr($client_reference_id, 0, 1);
            $number = intval(substr($client_reference_id, 1));

            if(in_array($char,['M', 'A'])) {
                $order = Order::where('stripe_session_id', $stripe_session_id)->first();
                // update gift card payment if there is one
                $payment = GiftCardPayment::where('order_id', $order->id)
                    ->where('status', 'pledged')->first();
                if($payment) {
                    $payment->update(['status' => 'canceled']);
                    // refund the amount to the gift card
                    $card = $payment->card;
                    if(!is_null($card)) {
                        $card->update([
                            'balance' => ($card->balance + $payment->amount),
                        ]);
                    }
                }
            } else if($char === 'C') {
                $order = GiftCardOrder::where('stripe_session_id', $stripe_session_id)->first();
            }

            $subscription = Subscription::where('stripe_session_id', $stripe_session_id)->first();

            if (!$subscription) {
                Log::warning("Subscription with Stripe Session ID {$stripe_session_id} not found.");

                // todo look for orders

                return;
            }

            $stripeEventCreated = $event['created'];
            if (is_null($subscription->stripe_event_created) || $stripeEventCreated > $subscription->stripe_event_created) {
                $subscription->status = 'expired';
                $subscription->stripe_event_created = $stripeEventCreated;
                $subscription->save();
                $user = $subscription->user;
                $user->update([
                    'subscription_id' => null,
                    'subscription_plan_id' => null,
                    'billing_interval' => null,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('WEBHOOK PROCESSING ERROR: ' . $e->getMessage());
        }
    }
}
