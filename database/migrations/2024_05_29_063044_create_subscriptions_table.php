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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->unique();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('subscription_plan_id')->constrained('subscription_plans');
            $table->dateTime('billing_period_ends')->nullable();
            $table->boolean('renews')->nullable();
            $table->double('price');
            $table->string('stripe_checkout_session_id')->nullable();
            $table->string('stripe_subscription_id')->nullable();
            $table->string('stripe_plan_id')->nullable();
            $table->string('status')->default('initial');
            $table->string('billing_interval');
            $table->unsignedTinyInteger('frequency')->nullable();
            $table->dateTime('next_delivery')->nullable();
            $table->bigInteger('stripe_event_created')->nullable();
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->after('can_subscribe', function($table) {
                $table->foreignId('subscription_id')->nullable()->constrained('subscriptions');
                $table->foreignId('subscription_plan_id')->nullable()->constrained('subscription_plans');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['subscription_id', 'subscription_plan_id']);
        });
        Schema::dropIfExists('subscriptions');
    }
};
