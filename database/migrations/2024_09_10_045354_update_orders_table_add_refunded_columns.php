<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->after('amount_gift_card', function($table) {
                $table->double('refunded_stripe')->default(0);
                $table->double('refunded_gift_card')->default(0);
            });
            $table->after('stripe_session_id', function($table) {
                $table->string('stripe_payment_intent_id')->nullable();
            });
        });
        Schema::table('gift_card_payments', function (Blueprint $table) {
            $table->after('order_id', function($table) {
                $table->string('stripe_payment_intent_id')->nullable();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['refunded_stripe', 'refunded_gift_card', 'stripe_payment_intent_id']);
        });
        Schema::table('gift_card_payments', function (Blueprint $table) {
            $table->dropColumn(['stripe_payment_intent_id']);
        });
    }
};
