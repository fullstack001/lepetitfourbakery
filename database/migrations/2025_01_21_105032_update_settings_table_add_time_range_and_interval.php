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
        Schema::table('settings', function (Blueprint $table) {
            $table->after('future_pickup_day_count', function($table) {
                $table->unsignedTinyInteger('pickup_opening_hour')->default(9);
                $table->unsignedTinyInteger('pickup_closing_hour')->default(14);
                $table->unsignedTinyInteger('interval_minutes')->default(15);
                $table->unsignedTinyInteger('max_orders_per_slot')->default(10);
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['pickup_opening_hour', 'pickup_closing_hour', 'interval_minutes', 'max_orders_per_slot']);
        });
    }
};
