<?php

use App\Models\Order;
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
        Schema::table('orders', function (Blueprint $table) {
            $table->after('type', function($table) {
                $table->string('pickup_code')->nullable();
            });
        });
        foreach(Order::whereNotNull('datetime')->get() as $order) {
            $pickup_code = $order->datetime->format('ymdHi');
            $order->update(compact('pickup_code'));
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['pickup_code']);
        });
    }
};
