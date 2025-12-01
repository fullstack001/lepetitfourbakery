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
        Schema::table('subscription_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'box_feature_1_name',
                'box_feature_1_standard',
                'box_feature_1_premium',
                'box_feature_2_name',
                'box_feature_2_standard',
                'box_feature_2_premium',
                'box_feature_3_name',
                'box_feature_3_standard',
                'box_feature_3_premium',
                'box_feature_4_name',
                'box_feature_4_standard',
                'box_feature_4_premium',
                'box_feature_5_name',
                'box_feature_5_standard',
                'box_feature_5_premium',
                'box_feature_6_name',
                'box_feature_6_standard',
                'box_feature_6_premium',
                'box_feature_7_name',
                'box_feature_7_standard',
                'box_feature_7_premium',
                'box_feature_8_name',
                'box_feature_8_standard',
                'box_feature_8_premium',
                'box_feature_9_name',
                'box_feature_9_standard',
                'box_feature_9_premium',
                'box_feature_10_name',
                'box_feature_10_standard',
                'box_feature_10_premium',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscription_page_contents', function (Blueprint $table) {
            $table->after('box_title', function($table) {
                $table->string('box_feature_1_name');
                $table->string('box_feature_1_standard')->default('-');
                $table->string('box_feature_1_premium')->default('-');
                $table->string('box_feature_2_name')->default('-');
                $table->string('box_feature_2_standard')->default('-');
                $table->string('box_feature_2_premium')->default('-');
                $table->string('box_feature_3_name')->default('-');
                $table->string('box_feature_3_standard')->default('-');
                $table->string('box_feature_3_premium')->default('-');
                $table->string('box_feature_4_name')->default('-');
                $table->string('box_feature_4_standard')->default('-');
                $table->string('box_feature_4_premium')->default('-');
                $table->string('box_feature_5_name')->default('-');
                $table->string('box_feature_5_standard')->default('-');
                $table->string('box_feature_5_premium')->default('-');
                $table->string('box_feature_6_name')->nullable();
                $table->string('box_feature_6_standard')->nullable();
                $table->string('box_feature_6_premium')->nullable();
                $table->string('box_feature_7_name')->nullable();
                $table->string('box_feature_7_standard')->nullable();
                $table->string('box_feature_7_premium')->nullable();
                $table->string('box_feature_8_name')->nullable();
                $table->string('box_feature_8_standard')->nullable();
                $table->string('box_feature_8_premium')->nullable();
                $table->string('box_feature_9_name')->nullable();
                $table->string('box_feature_9_standard')->nullable();
                $table->string('box_feature_9_premium')->nullable();
                $table->string('box_feature_10_name')->nullable();
                $table->string('box_feature_10_standard')->nullable();
                $table->string('box_feature_10_premium')->nullable();
            });
        });
    }
};
