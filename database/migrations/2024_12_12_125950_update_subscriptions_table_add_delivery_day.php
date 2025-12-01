<?php

use App\Models\Subscription;
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
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->after('frequency', function($table) {
                $table->string('delivery_day')->default('saturday');
            });
        });
        $subscriptions = Subscription::where('status', 'active')->get();
        $now = Carbon::now();
        $upcoming_saturday = $now->copy()->next(Carbon::SATURDAY);
        foreach($subscriptions as $subscription) {
            $subscription->update([
                'next_delivery' => $upcoming_saturday,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn(['delivery_day']);
        });
    }
};
