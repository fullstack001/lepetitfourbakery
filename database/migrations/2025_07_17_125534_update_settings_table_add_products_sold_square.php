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
        $settings = Settings::first();
        if($settings) {
            Schema::table('settings', function (Blueprint $table) {
                $table->after('products_sold', function($table) {
                    $table->integer('products_sold_square')->default(42793);
                });
            });
            $settings->products_sold = 0;
            $settings->save();
        } else {
            throw new \Exception('Settings record not found. Migration aborted.');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $settings = Settings::first();
        if($settings) {
            $settings->products_sold = $settings->products_sold_square;
            $settings->save();
            Schema::table('settings', function (Blueprint $table) {
                $table->dropColumn(['products_sold_square']);
            });
        } else {
            throw new \Exception('Settings record not found. Migration aborted.');
        }
    }
};
