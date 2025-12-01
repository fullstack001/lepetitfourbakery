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
        Schema::table('products', function (Blueprint $table) {
            $table->after('active', function($table) {
                $table->boolean('weekend_only')->default(false);
            });
        });
        Schema::table('product_variations', function (Blueprint $table) {
            $table->after('active', function($table) {
                $table->boolean('weekend_only')->default(false);
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['weekend_only']);
        });
        Schema::table('product_variations', function (Blueprint $table) {
            $table->dropColumn(['weekend_only']);
        });
    }
};
