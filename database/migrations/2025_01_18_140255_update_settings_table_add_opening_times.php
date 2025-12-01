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
            $table->after('min_hours_before_pickup', function($table) {
                $table->string('monday_opening_times')->nullable();
                $table->string('tuesday_opening_times')->nullable()->default('8:00am - Sold out');
                $table->string('wednesday_opening_times')->nullable()->default('8:00am - Sold out');
                $table->string('thursday_opening_times')->nullable()->default('8:00am - Sold out');
                $table->string('friday_opening_times')->nullable()->default('8:00am - Sold out');
                $table->string('saturday_opening_times')->nullable()->default('8:30am - Sold out');
                $table->string('sunday_opening_times')->nullable()->default('8:30am - Sold out');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn([
                    'monday_opening_times',
                    'tuesday_opening_times',
                    'wednesday_opening_times',
                    'thursday_opening_times',
                    'friday_opening_times',
                    'saturday_opening_times',
                    'sunday_opening_times'
                ]
            );
        });
    }
};
