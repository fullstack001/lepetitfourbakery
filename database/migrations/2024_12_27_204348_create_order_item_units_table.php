<?php

use App\Traits\Helpers;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    use Helpers;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_item_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->foreignId('order_id')->constrained('orders');
            $table->foreignId('order_item_id')->constrained('order_items');
            $table->foreignId('product_id')->constrained('products');
            $table->foreignId('variation_id')->constrained('product_variations');
            $table->string('product_name');
            $table->string('variation_name');
            $table->double('variation_price')->nullable();
            $table->unsignedInteger('quantity_per_variation');
            $table->unsignedInteger('quantity_in_box');
            $table->unsignedInteger('ordered_quantity');
            $table->string('thumbnail');
            $table->timestamps();
        });

        $this->createOrderItemUnits();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_item_units');
    }
};
