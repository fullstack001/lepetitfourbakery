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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->foreignId('subscription_id')->nullable()->constrained('subscriptions');
            $table->string('stripe_session_id');
            $table->bigInteger('number');
            $table->dateTime('datetime');
            $table->string('email');
            $table->string('phone');
            $table->double('amount');
            $table->string('type')->default('catering');
            $table->string('status')->default('initial');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
