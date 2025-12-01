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
        Schema::table('gift_card_orders', function (Blueprint $table) {
            $table->after('stripe_session_id', function($table) {
                $table->string('stripe_payment_intent_id')->nullable();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gift_card_orders', function (Blueprint $table) {
            $table->dropColumn(['stripe_payment_intent_id']);
        });
    }
};
