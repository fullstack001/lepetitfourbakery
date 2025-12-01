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
        Schema::create('about_page_contents', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('introduction');
            $table->string('module_1_image')->nullable();
            $table->string('module_1_title')->nullable();
            $table->string('module_1_button_text')->nullable();
            $table->string('module_1_button_link')->nullable();
            $table->string('module_2_image')->nullable();
            $table->string('module_2_title')->nullable();
            $table->string('module_2_button_text')->nullable();
            $table->string('module_2_button_link')->nullable();
            $table->string('module_3_image')->nullable();
            $table->string('module_3_title')->nullable();
            $table->string('module_3_button_text')->nullable();
            $table->string('module_3_button_link')->nullable();
            $table->string('module_4_image')->nullable();
            $table->string('module_4_title')->nullable();
            $table->string('module_4_button_text')->nullable();
            $table->string('module_4_button_link')->nullable();
            $table->string('module_5_image')->nullable();
            $table->string('module_5_title')->nullable();
            $table->string('module_5_button_text')->nullable();
            $table->string('module_5_button_link')->nullable();
            $table->string('module_6_image')->nullable();
            $table->string('module_6_title')->nullable();
            $table->string('module_6_button_text')->nullable();
            $table->string('module_6_button_link')->nullable();
            $table->string('module_7_image')->nullable();
            $table->string('module_7_title')->nullable();
            $table->string('module_7_button_text')->nullable();
            $table->string('module_7_button_link')->nullable();
            $table->string('module_8_image')->nullable();
            $table->string('module_8_title')->nullable();
            $table->string('module_8_button_text')->nullable();
            $table->string('module_8_button_link')->nullable();
            $table->string('module_9_image')->nullable();
            $table->string('module_9_title')->nullable();
            $table->string('module_9_button_text')->nullable();
            $table->string('module_9_button_link')->nullable();
            $table->text('testimonials_title');
            $table->text('testimonials_introduction');
            $table->string('testimonial_1_name');
            $table->text('testimonial_1_content');
            $table->string('testimonial_2_name');
            $table->text('testimonial_2_content');
            $table->string('testimonial_3_name');
            $table->text('testimonial_3_content');
            $table->string('instructions_baked_goods_title');
            $table->string('instructions_baked_goods_youtube_video_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_page_contents');
    }
};
