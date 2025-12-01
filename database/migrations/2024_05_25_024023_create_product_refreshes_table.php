<?php

use App\Models\ProductRefresh;
use Carbon\Carbon;
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
        Schema::create('product_refreshes', function (Blueprint $table) {
            $table->id();
            $table->dateTime('datetime');
            $table->timestamps();
        });
        $now = Carbon::now();
        $refresh = ProductRefresh::create(['datetime' => $now]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_refreshes');
    }
};
