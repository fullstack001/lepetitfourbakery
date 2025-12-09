<?php

namespace App\Jobs\StripeWebhooks;

use App\Mail\OrderNotification;
use App\Models\Delivery;
use App\Models\GiftCard;
use App\Models\GiftCardOrder;
use App\Models\GiftCardPayment;
use App\Models\Order;
use App\Models\Settings;
use App\Models\Subscription;
use App\Models\User;
use App\Notifications\GiftCardNotification;
use App\Traits\Helpers;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Termwind\Components\Li;

class HandleCheckoutSessionCompleted implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Helpers;

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
        $stripe_session_id = $event['data']['object']['id'];
        $customer_stripe_id = $event['data']['object']['customer'];
        $client_reference_id = $event['data']['object']['client_reference_id'];
        $stripe_payment_intent_id = $event['data']['object']['payment_intent'];
        Log::error($stripe_payment_intent_id);
        Log::info('job checkout session completed -----------------------');
        Log::info($stripe_session_id);
        Log::info($client_reference_id);

        $order = null;
        $char = substr($client_reference_id, 0, 1);
        $number = intval(substr($client_reference_id, 1));

        // M: menu, A: add-on

        if($char === 'M') {
            $order = Order::with('items')->where('stripe_session_id', $stripe_session_id)->first();
            
            // Log environment check
            if(is_null($order)) {
                Log::warning("Order confirmation email: Order not found for Stripe Session ID: {$stripe_session_id}");
            } elseif(!app()->environment(['staging', 'production'])) {
                Log::warning("Order confirmation email: Skipped - Environment is '".app()->environment()."'. Emails only send in staging/production. Order #{$order->number}, Email: {$order->email}");
            } else {
                try {
                    $user = $order->user;
                    $settings = Settings::first();
                    
                    // Validate order email
                    if(empty($order->email) || !filter_var($order->email, FILTER_VALIDATE_EMAIL)) {
                        Log::error("Order confirmation email: Invalid or missing email address for Order #{$order->number}. Email: '{$order->email}'");
                        throw new \Exception("Invalid email address: {$order->email}");
                    }
                    
                    $data = [
                        'order_number' => $order->number,
                        'user_name' => $user->name??$order->full_name??'Undefined',
                        'user_email' => $order->email,
                        'admin_email' => env('ADMIN_EMAIL'),
                        'amount_formatted' => '$' . number_format($order->amount, 2, '.',','),
                        'date_formatted' => $order->created_at_formatted,
                        'pickup_formatted' => $order->datetime_formatted,
                        'our_address_1' => $settings->our_address_1,
                        'our_address_2' => $settings->our_address_2,
                        'our_city_postcode' => $settings->our_city_postcode,
                        'our_phone_number' => $settings->our_phone_number,
                        'items' => $order->items,
                        'custom_message' => 'Thank you for your order!',
                        'is_pickup' => false,
                    ];
                    
                    Log::info("Order confirmation email: Starting email send for Order #{$order->number} to {$order->email}");

                    // send email to client
                    try {
                        Mail::to($order->email)->send(new OrderNotification(
                            'Your order with Le Petit Four Bakery',
                            $data
                        ));
                        Log::info("Order confirmation email: Successfully sent to customer {$order->email} for Order #{$order->number}");
                    } catch (\Exception $e) {
                        Log::error("Order confirmation email: Failed to send to customer {$order->email} for Order #{$order->number}. Error: " . $e->getMessage());
                        throw $e; // Re-throw to be caught by outer catch
                    }

                    sleep(1);

                    // send email to admin
                    $adminEmail = env('ADMIN_EMAIL');
                    if(!empty($adminEmail) && filter_var($adminEmail, FILTER_VALIDATE_EMAIL)) {
                        try {
                            Mail::to($adminEmail)->send(new OrderNotification(
                                'Your order with Le Petit Four Bakery',
                                $data
                            ));
                            Log::info("Order confirmation email: Successfully sent to admin {$adminEmail} for Order #{$order->number}");
                        } catch (\Exception $e) {
                            Log::error("Order confirmation email: Failed to send to admin {$adminEmail} for Order #{$order->number}. Error: " . $e->getMessage());
                        }
                    } else {
                        Log::warning("Order confirmation email: Admin email not configured or invalid: '{$adminEmail}'");
                    }

                    sleep(1);

                    // send email to michel
                    try {
                        Mail::to('michel@lepetitfourbakery.com')->send(new OrderNotification(
                            'Your order with Le Petit Four Bakery',
                            $data
                        ));
                        Log::info("Order confirmation email: Successfully sent to michel@lepetitfourbakery.com for Order #{$order->number}");
                    } catch (\Exception $e) {
                        Log::error("Order confirmation email: Failed to send to michel@lepetitfourbakery.com for Order #{$order->number}. Error: " . $e->getMessage());
                    }

                    sleep(1);

                    // send email to dev
                    $debug = true;
                    if($debug) {
                        try {
                            Mail::to('jameschang1528@gmail.com')->send(new OrderNotification(
                                'Your order with Le Petit Four Bakery',
                                $data
                            ));
                            Log::info("Order confirmation email: Successfully sent to dev email for Order #{$order->number}");
                        } catch (\Exception $e) {
                            Log::error("Order confirmation email: Failed to send to dev email for Order #{$order->number}. Error: " . $e->getMessage());
                        }
                    }
                    
                    Log::info("Order confirmation email: Email process completed for Order #{$order->number}");

                } catch (\Exception $e) {
                    Log::error("Order confirmation email: Critical error for Order #{$order->number} (Email: {$order->email}). Error: " . $e->getMessage());
                    Log::error("Order confirmation email: Stack trace: " . $e->getTraceAsString());
                }
            }
        }

        if(in_array($char,['M', 'A'])) {
            $order = Order::where('stripe_session_id', $stripe_session_id)->first();
            if(is_null($order)) {
                Log::warning("Order with Stripe Session ID {$stripe_session_id} not found.");
                return;
            } else {
                $user = $this->updateUser($customer_stripe_id, $order);
                // update gift card payment if there is one
                $payment = GiftCardPayment::where('order_id', $order->id)
                    ->where('status', 'pledged')->first();
                if($payment) {
                    $payment->update(['status' => 'complete']);
                }
                // if add-on
                if($order->type === 'add-on') {
                    if(is_null($user)) {
                        Log::info('User not found');
                    } else {
                        $next_available_date = $user->next_available_date;
                        $subscription = $user->subscription;

                        if(!is_null($next_available_date) && !is_null($subscription)) {

                            $delivery = Delivery::where('user_id', $user->id)
                                ->where('subscription_id', $subscription->id)
                                ->whereDate('datetime', $next_available_date)->first();

                            if(!is_null($delivery)) {
                                $order->update([
                                    'delivery_id' => $delivery->id,
                                ]);
                            }

                        }
                    }

                }
            }
            // C: gift card
        } else if($char === 'C') {
            $order = GiftCardOrder::where('stripe_session_id', $stripe_session_id)->first();
            if(is_null($order)) {
                Log::warning("Order with Stripe Session ID {$stripe_session_id} not found.");
                return;
            } else {
                $user = $this->updateUser($customer_stripe_id, $order);
                // generate gift card
                $code = $this->getUniqueGiftCardCode();
                $data = [
                    'order_id' => $order->id,
                    'email' => $order->email,
                    'number' => $code,
                    'amount' => $order->amount,
                    'balance' => $order->amount,
                    'active' => true,
                ];
                $card = GiftCard::create($data);
                // send notification
                if(app()->environment(['staging', 'production'])) {
                    $user = new User();
                    $user->email = $order->recipient;
                    $user->notify(new GiftCardNotification($code));
                } else {
                    Log::info('gift card code sent');
                }
            }
        } else {
            Log::error('Order not found');
            Log::error('char:' . $char);
            Log::error('number:' . $number);
            return;
        }

        if(!is_null($order)) {
            $order->update([
                'stripe_payment_intent_id' => $stripe_payment_intent_id,
                'status' => 'paid',
            ]);
            foreach($order->items as $order_item) {
                $this->processUnits($order_item);
            }
        }


    }

    protected function updateUser($customer_stripe_id, $order)
    {
        $user = $order->user??null;

        if(!is_null($user)) {
            $user->update([
                'stripe_id' => $customer_stripe_id,
            ]);

            return $user;
        }
        return null;
    }

    protected function generateGiftCardCode() {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $sections = [];

        for ($i = 0; $i < 4; $i++) {
            $sections[] = substr(str_shuffle($characters), 0, 4);
        }

        return implode('-', $sections);
    }

    protected function getUniqueGiftCardCode() {
        do {
            $code = $this->generateGiftCardCode();
        } while (GiftCard::where('number', $code)->exists());

        return $code;
    }

}
