<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleChargeSucceeded implements ShouldQueue
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
        $event = $this->payload['payload'];
        $object = $event['data']['object'];

        $stripe_charge_id = $object['id']??null;
        $stripe_payment_intent_id = $object['payment_intent']??null;
        $amount = $object['amount']??null;
        $amount_captured = $object['amount_captured']??null;
        $card_last_4 = $object['payment_method_details']['card']['last4']??null;
        $status = $object['status']??null;

        $payment = Payment::firstOrCreate(compact([
            'stripe_charge_id',
            'stripe_payment_intent_id',
            'amount',
            'amount_captured',
            'card_last_4',
            'status',
        ]));
    }
}
