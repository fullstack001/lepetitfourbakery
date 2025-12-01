<?php

use App\Models\Settings;
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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('our_address_1')->default('Le Petit Four');
            $table->string('our_address_2')->default('567 Cedar Street');
            $table->string('our_city_postcode')->default('Liberal, KS 67901');
            $table->string('our_phone_number')->default('555-0199');
            $table->timestamps();
        });
        $settings = Settings::create();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
