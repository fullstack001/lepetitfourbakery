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
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->unique();
            $table->unsignedTinyInteger('position');
            $table->string('name');
            $table->string('french_name');
            $table->string('frequency');
            $table->string('image');
            $table->boolean('has_delivery');
            $table->boolean('has_custom_boxes');
            $table->boolean('has_customization');
            $table->boolean('has_add_ons');
            $table->boolean('has_private_events');
            $table->double('price_monthly')->nullable();
            $table->double('price_biweekly')->nullable();
            $table->double('price_weekly')->nullable();
            $table->string('price_monthly_string')->nullable();
            $table->string('price_biweekly_string')->nullable();
            $table->string('price_weekly_string')->nullable();
            $table->boolean('active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_plans');
    }
};
