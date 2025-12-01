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
        Schema::table('event_menu_categories', function (Blueprint $table) {
            $table->date('pickup_start_date')->nullable()->after('name');
            $table->date('pickup_end_date')->nullable()->after('pickup_start_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_menu_categories', function (Blueprint $table) {
            $table->dropColumn(['pickup_start_date', 'pickup_end_date']);
        });
    }
};
