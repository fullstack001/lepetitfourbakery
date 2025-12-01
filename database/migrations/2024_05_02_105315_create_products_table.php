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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->double('price')->default(0);
            $table->string('price_string')->default('$0.00');
            $table->boolean('in_sneak_peek_menu')->default(false);
            $table->boolean('in_catering_menu')->default(false);
            $table->boolean('in_add_ons_menu')->default(false);
            $table->boolean('has_image')->default(false);
            $table->boolean('active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
