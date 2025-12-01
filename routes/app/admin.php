<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminControllers\ContentController;
use App\Http\Controllers\AdminControllers\ProductsController;
use App\Http\Controllers\AdminControllers\SubscriptionsController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::middleware('team')->prefix('admin')->group(function() {

    Route::get('/', [AdminController::class, 'Dashboard'])->name('admin');

    Route::post('update-order-notes/{order}', [AdminController::class, 'updateOrderNotes'])->name('admin.update_order_notes');

    Route::middleware('admin')->group(function() {

        Route::get('get-available-products', [AdminController::class, 'getAvailableProducts'])->name('get_available_products');
        Route::post('get-pickup-dates', [AdminController::class, 'getPickupDates'])->name('admin.get_pickup_dates');
        Route::post('get-pickup-times', [AdminController::class, 'getPickupTimes'])->name('admin.get_pickup_times');

        // EVENTS MENU
        Route::prefix('events-menu')->group(function() {
            Route::get('/', [ProductsController::class, 'eventsMenu'])->name('admin.events_menu');
            Route::get('products/{category}', [ProductsController::class, 'manageEventsMenuProducts'])->name('admin.events_menu.products');
            Route::post('saveProducts/{category}', [ProductsController::class, 'saveEventsMenuProducts'])->name('admin.events_menu.products.save');
            Route::post('update-events-menu-category/{category}', [ProductsController::class, 'updateEventsMenuCategory'])->name('admin.events_menu.update_category');
            Route::post('create-events-menu-category', [ProductsController::class, 'createEventsMenuCategory'])->name('admin.events_menu.create_category');
        });

        // SETTINGS
        Route::prefix('settings')->group(function() {
            Route::get('/', [AdminController::class, 'settings'])->name('admin.settings');
            Route::post('update-address', [AdminController::class, 'updateSettingsAddress'])->name('admin.update_settings_address');
            Route::post('update-pickup-hours', [AdminController::class, 'updatePickupHours'])->name('admin.update_pickup_hours');
            Route::post('update-opening-times', [AdminController::class, 'updateOpeningTimes'])->name('admin.update_opening_times');
            Route::post('update-meta-tags', [AdminController::class, 'updateMetaTags'])->name('admin.update_meta_tags');
            Route::post('update-future-pickup-day-count', [AdminController::class, 'updateFuturePickupDayCount'])->name('admin.update_future_pickup_day_count');
            Route::post('update-time-range', [AdminController::class, 'updateTimeRange'])->name('admin.update_time_range');
//            Route::post('update-products-sold', [AdminController::class, 'updateProductsSold'])->name('admin.update_products_sold');
            Route::post('update-board-script', [AdminController::class, 'updateBoardScript'])->name('admin.update_board_script');
        });

        // CATEGORIES
        Route::prefix('categories')->group(function() {
            Route::get('/', [ProductsController::class, 'categories'])->name('admin.categories');
            Route::post('create', [ProductsController::class, 'createCategory'])->name('admin.create_category');
            Route::post('reorder-groups', [ProductsController::class, 'reorderGroups'])->name('admin.reorder_groups');
            Route::post('update/{category}', [ProductsController::class, 'updateCategory'])->name('admin.update_category');
        });

        // PRODUCTS
        Route::prefix('products')->group(function() {
            Route::get('/', [ProductsController::class, 'products'])->name('admin.products');
            Route::post('create', [ProductsController::class, 'createProduct'])->name('admin.create_product');
            Route::post('update/{product}', [ProductsController::class, 'updateProduct'])->name('admin.update_product');
            Route::prefix('product')->group(function() {
                Route::prefix('{product}')->group(function() {
                    Route::prefix('variations')->group(function() {
                        Route::post('create', [ProductsController::class, 'createVariation'])->name('admin.create_variation');
                        Route::post('update/{variation}', [ProductsController::class, 'updateVariation'])->name('admin.update_variation');
                    });
                });
            });
        });

        // GIFT CARDS
        Route::prefix('gift-cards')->group(function() {
            Route::get('/', [AdminController::class, 'cards'])->name('admin.cards');
            Route::post('update/{plan}', [AdminController::class, 'updateCard'])->name('admin.update_card');
        });

        // SUBSCRIPTION PLANS
        Route::prefix('subscription-plans')->group(function() {
            Route::get('/', [SubscriptionsController::class, 'home'])->name('admin.subscription_plans');
            Route::post('update/{plan}', [SubscriptionsController::class, 'updatePlan'])->name('admin.update_plan');
        });

        // USERS
        Route::prefix('users')->group(function() {
            Route::get('/', [AdminController::class, 'users'])->name('admin.users');
            Route::post('update-subscribers', [AdminController::class, 'updateSubscribers'])->name('admin.update_subscribers');
        });

        // ORDERS
        Route::prefix('orders')->group(function() {
            Route::get('/', [AdminController::class, 'orders'])->name('admin.orders');
            Route::get('ready', [AdminController::class, 'ordersReady'])->name('admin.orders_ready');
            Route::get('completed', [AdminController::class, 'ordersCompleted'])->name('admin.orders_completed');
            Route::get('canceled', [AdminController::class, 'ordersCanceled'])->name('admin.orders_canceled');
            Route::get('export', [AdminController::class, 'exportOrders'])->name('admin.orders_export');
            Route::post('initiate-refund/{order}', [AdminController::class, 'initiateRefund'])->name('admin.initiate_refund');
            Route::post('create-custom-order', [AdminController::class, 'createCustomOrder'])->name('admin.create_custom_order');
            Route::post('update-custom-order/{order}', [AdminController::class, 'updateCustomOrder'])->name('admin.update_custom_order');
        });

        // PAYMENTS
        Route::prefix('payments')->group(function() {
            Route::get('/', [AdminController::class, 'payments'])->name('admin.payments');
        });

        // TEAM
        Route::prefix('team')->group(function() {
            Route::get('/', [AdminController::class, 'team'])->name('admin.team');
            Route::post('search-user/{type}', [AdminController::class, 'searchUser'])->name('admin.search_user');
            Route::post('create-team-member', [AdminController::class, 'createTeamMember'])->name('admin.create_team_member');
            Route::post('update-team-member/{member}', [AdminController::class, 'updateTeamMember'])->name('admin.update_team_member');
            Route::post('create-admin', [AdminController::class, 'createAdmin'])->name('admin.create_admin');
            Route::post('revoke-admin', [AdminController::class, 'revokeAdmin'])->name('admin.revoke_admin');
        });

        // SUBSCRIPTIONS
        Route::prefix('subscriptions')->group(function() {
            Route::get('/', [AdminController::class, 'subscriptions'])->name('admin.subscriptions');
            Route::post('update-status/{subscription}', [AdminController::class, 'updateSubscriptionStatus'])->name('admin.update_subscription_status');
            Route::post('update-delivery-address/{subscription}', [AdminController::class, 'updateDeliveryAddress'])->name('admin.update_delivery_address');
        });

        // DELIVERIES
        Route::prefix('deliveries')->group(function() {
            Route::get('/', [AdminController::class, 'deliveries'])->name('admin.deliveries');
            Route::get('open/{delivery}', [AdminController::class, 'openDelivery'])->name('admin.open_delivery');
            Route::post('update/{delivery}', [AdminController::class, 'updateDelivery'])->name('admin.update_delivery');
        });

        // DISABLED DATES
        Route::prefix('closed-dates')->group(function() {
            Route::get('/', [AdminController::class, 'closedDates'])->name('admin.closed_dates');
            Route::post('create', [AdminController::class, 'createClosedDate'])->name('admin.create_closed_date');
            Route::post('delete/{closed_date}', [AdminController::class, 'deleteClosedDate'])->name('admin.delete_closed_date');
        });

        // LANDING MODAL
        Route::prefix('landing-modal')->group(function() {
            Route::get('/', [AdminController::class, 'landingModal'])->name('admin.landing_modal');
            Route::post('save-contents', [AdminController::class, 'saveLandingModalContents'])->name('admin.save_landing_modal_contents');
        });

        // POST CODES
        Route::prefix('post-codes')->group(function() {
            Route::get('/', [AdminController::class, 'postCodes'])->name('admin.post_codes');
            Route::post('create', [AdminController::class, 'createPostCode'])->name('admin.create_post_code');
            Route::post('update/{post_code}', [AdminController::class, 'updatePostCode'])->name('admin.update_post_code');
        });

        // CONTENT
        Route::prefix('main-content')->group(function() {
            Route::get('/', [ContentController::class, 'main'])->name('admin.main_content');
            Route::post('update-homepage-content', [ContentController::class, 'updateHomepageContent'])->name('admin.update_homepage_content');
            Route::post('update-about-content', [ContentController::class, 'updateAboutContent'])->name('admin.update_about_content');
            Route::post('update-catering-content', [ContentController::class, 'updateCateringContent'])->name('admin.update_catering_content');
            Route::post('update-subscription-content', [ContentController::class, 'updateSubscriptionContent'])->name('admin.update_subscription_content');
            Route::post('update-contact-content', [ContentController::class, 'updateContactContent'])->name('admin.update_contact_content');
            Route::post('update-modal-content', [ContentController::class, 'updateModalContent'])->name('admin.update_modal_content');
        });
        Route::prefix('legal-content')->group(function() {
            Route::get('/', [ContentController::class, 'legal'])->name('admin.legal_content');
            Route::prefix('terms')->group(function() {
                Route::get('/', [ContentController::class, 'terms'])->name('admin.terms');
                Route::post('create-category', [ContentController::class, 'createTermsCategory'])->name('admin.create_terms_category');
                Route::post('update-category/{category}', [ContentController::class, 'updateTermsCategory'])->name('admin.update_terms_category');
                Route::post('create-paragraph', [ContentController::class, 'createTermsParagraph'])->name('admin.create_terms_paragraph');
                Route::post('update-paragraph/{paragraph}', [ContentController::class, 'updateTermsParagraph'])->name('admin.update_terms_paragraph');
                Route::post('update-terms-order', [ContentController::class, 'updateTermsOrder'])->name('admin.update_terms_order');
            });
            Route::prefix('privacy')->group(function() {
                Route::get('/', [ContentController::class, 'privacy'])->name('admin.privacy');
                Route::post('create-category', [ContentController::class, 'createPrivacyCategory'])->name('admin.create_privacy_category');
                Route::post('update-category/{category}', [ContentController::class, 'updatePrivacyCategory'])->name('admin.update_privacy_category');
                Route::post('create-paragraph', [ContentController::class, 'createPrivacyParagraph'])->name('admin.create_privacy_paragraph');
                Route::post('update-paragraph/{paragraph}', [ContentController::class, 'updatePrivacyParagraph'])->name('admin.update_privacy_paragraph');
                Route::post('update-privacy-order', [ContentController::class, 'updatePrivacyOrder'])->name('admin.update_privacy_order');
            });
        });

    });

    Route::prefix('orders')->group(function() {
        Route::post('update-status/{order}', [AdminController::class, 'updateOrderStatus'])->name('admin.update_order_status');
        Route::post('update-datetime/{order}', [AdminController::class, 'updateOrderDatetime'])->name('admin.update_order_datetime');
    });


});

Route::middleware('team')->prefix('team')->group(function() {
    Route::get('/', [TeamController::class, 'dashboard'])->name('team');
    Route::prefix('orders')->group(function() {
        Route::get('/', [TeamController::class, 'orders'])->name('team.orders');
        Route::get('ready', [TeamController::class, 'ordersReady'])->name('team.orders_ready');
        Route::get('completed', [TeamController::class, 'ordersCompleted'])->name('team.orders_completed');
        Route::get('canceled', [TeamController::class, 'ordersCanceled'])->name('team.orders_canceled');
        Route::get('export', [TeamController::class, 'exportOrders'])->name('team.orders_export');
        Route::post('update-status/{order}', [TeamController::class, 'updateOrderStatus'])->name('team.update_order_status');
    });
    Route::prefix('bakery')->group(function() {
        Route::get('/', [TeamController::class, 'bakery3'])->name('team.bakery');
    });
});
