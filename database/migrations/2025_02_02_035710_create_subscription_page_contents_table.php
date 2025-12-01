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
        Schema::create('subscription_page_contents', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('introduction');
            $table->text('box_title');
            // deleted
            $table->string('box_feature_1_name');
            $table->string('box_feature_1_standard');
            $table->string('box_feature_1_premium');
            $table->string('box_feature_2_name');
            $table->string('box_feature_2_standard');
            $table->string('box_feature_2_premium');
            $table->string('box_feature_3_name');
            $table->string('box_feature_3_standard');
            $table->string('box_feature_3_premium');
            $table->string('box_feature_4_name');
            $table->string('box_feature_4_standard');
            $table->string('box_feature_4_premium');
            $table->string('box_feature_5_name');
            $table->string('box_feature_5_standard');
            $table->string('box_feature_5_premium');
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
            // end deleted
            $table->string('feature_1_icon');
            $table->string('feature_1_title');
            $table->text('feature_1_content');
            $table->string('feature_2_icon');
            $table->string('feature_2_title');
            $table->text('feature_2_content');
            $table->string('feature_3_icon');
            $table->string('feature_3_title');
            $table->text('feature_3_content');
            $table->text('subscribed_box_instructions');
            $table->text('subscribed_instructions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_page_contents');
    }
};
