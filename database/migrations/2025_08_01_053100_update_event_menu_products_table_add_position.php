<?php

use App\Models\EventMenuCategory;
use App\Models\EventMenuProduct;
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
        Schema::table('event_menu_products', function (Blueprint $table) {
            $table->after('product_id', function($table) {
                $table->integer('position')->nullable();
            });
        });
        foreach(EventMenuCategory::get() as $category)
        {
            $position = 0;
            foreach(EventMenuProduct::where('event_menu_category_id', $category->id)->get() as $event_menu_product)
            {
                $position++;
                $event_menu_product->update(['position' => $position]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_menu_products', function (Blueprint $table) {
            $table->dropColumn(['position']);
        });
    }
};
