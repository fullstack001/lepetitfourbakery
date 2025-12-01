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
        Schema::create('toast_croissant_sales', function (Blueprint $table) {
            $table->id();
            $table->date('business_date')->index(); // YYYY-MM-DD format
            $table->string('menu_item_name');
            $table->string('croissant_type'); // categorized type
            $table->decimal('quantity_sold', 10, 2)->default(0);
            $table->timestamps();

            // Ensure we don't store duplicates for same date + menu item
            $table->unique(['business_date', 'menu_item_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toast_croissant_sales');
    }
};