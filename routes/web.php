<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\CoreController;
use App\Http\Controllers\SubscriptionsController;
use App\Http\Middleware\Admin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('welcome', [CoreController::class, 'welcome'])->name('welcome');
Route::post('validate-key', [CoreController::class, 'validateKey'])->name('validate_key');
Route::post('dismiss-landing-modal', [CoreController::class, 'dismissLandingModal'])->name('dismiss_landing_modal');
Route::post('newsletter-subscribe', [CoreController::class, 'newsletterSubscribe'])->name('newsletter_subscribe');
Route::get('/', [CoreController::class, 'home'])->name('home');
Route::get('la-boutique', [CoreController::class, 'about'])->name('la_boutique');
Route::get('catering-menu', [CoreController::class, 'menu'])->name('catering_menu');
Route::get('events-menu/{category}', [CoreController::class, 'eventsMenu'])->name('events_menu');
Route::get('contact-us', [CoreController::class, 'contact'])->name('contact');
Route::post('send-message', [CoreController::class, 'sendMessage'])->name('send_message');
Route::get('terms-and-conditions', [CoreController::class, 'terms'])->name('terms');
Route::get('privacy-policy', [CoreController::class, 'privacy'])->name('privacy');
//    Route::prefix('gift-cards')->group(function() {
//        Route::get('/', [CoreController::class, 'giftCards'])->name('gift_cards');
//        Route::post('checkout', [CoreController::class, 'giftCardCheckout'])->name('gift_card_checkout');
//        Route::get('checkout/success', [CoreController::class, 'giftCardCheckoutSuccess'])->name('gift_card_checkout_success');
//        Route::get('checkout/error', [CoreController::class, 'giftCardCheckoutError'])->name('gift_card_checkout_error');
//        Route::post('verify', [CoreController::class, 'verifyGiftCard'])->name('verify_gift_card');
//    });
Route::post('checkout', [CoreController::class, 'checkout'])->name('checkout');
Route::post('order-checkout/{order}', [CoreController::class, 'orderCheckout'])->name('order_checkout');
Route::post('order-reset/{order}', [CoreController::class, 'orderReset'])->name('order_reset');
Route::post('order-cancel/{order}', [CoreController::class, 'orderCancel'])->name('order_cancel');
Route::get('checkout/success', [CoreController::class, 'checkoutSuccess'])->name('checkout_success');
Route::get('checkout/error', [CoreController::class, 'checkoutError'])->name('checkout_error');


Route::prefix('cart')->group(function() {
    Route::get('/', [CoreController::class, 'cart'])->name('cart');
    Route::post('update-quantity', [CoreController::class, 'updateCartQuantity'])->name('update_cart_quantity');
    Route::post('delete-item', [CoreController::class, 'deleteCartItem'])->name('delete_cart_item');
    Route::post('update-note/{item}', [CoreController::class, 'updateOrderItemNote'])->name('update_note');
});

Route::post('add-to-cart', [CoreController::class, 'addToCart'])->name('add_to_cart');

Route::post('get-pickup-times', [CoreController::class, 'getPickupTimes'])->name('get_pickup_times');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::prefix('account')->group(function() {
        Route::get('/', [AccountsController::class, 'account'])->name('account');
        Route::get('get-address', [AccountsController::class, 'getAddress'])->name('get_address');
        Route::post('save-postcode', [AccountsController::class, 'savePostcode'])->name('save_postcode');
        Route::post('update-address', [AccountsController::class, 'updateAddress'])->name('update_address');
    });
    Route::prefix('orders')->group(function() {
        Route::get('/', [AccountsController::class, 'orders'])->name('orders');
        Route::get('{order}', [AccountsController::class, 'order'])->name('order');
    });
    //ADMIN
    include_once (__DIR__ . '/app/admin.php');

    Route::middleware(['can_subscribe'])->group(function() {
        Route::get('subscription', [SubscriptionsController::class, 'subscription'])->name('subscription');
        Route::post('subscribe', [SubscriptionsController::class, 'subscribe'])->name('subscribe');
        Route::post('update-delivery-day', [SubscriptionsController::class, 'updateDeliveryDay'])->name('update_delivery_day');
        Route::prefix('premium')->group(function() {
            Route::post('create-subscription-item', [SubscriptionsController::class, 'createPremiumSubscriptionItem'])->name('create_premium_subscription_item');
            Route::post('update-subscription-item/{item}', [SubscriptionsController::class, 'updatePremiumSubscriptionItem'])->name('update_premium_subscription_item');
            Route::post('update-box-selection', [SubscriptionsController::class, 'updateBoxSelection'])->name('update_box_selection');
        });
        Route::post('add-ons/checkout', [SubscriptionsController::class, 'addonCheckout'])->name('add_on_checkout');
    });

    Route::post('/stripe/customer-portal', [SubscriptionsController::class, 'createCustomerPortalSession'])
        ->name('stripe.customer-portal');

});

Route::stripeWebhooks('checkout/update');

Route::get('/{any}', function () {
    abort(404);
})->where('any', '.*')->name('spa');