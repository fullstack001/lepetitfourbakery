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
        Schema::create('homepage_contents', function (Blueprint $table) {
            $table->id();

            // hero
            $table->string('hero_background_image_desktop');
            $table->string('hero_background_image_mobile');
            $table->text('hero_title');
            $table->text('hero_introduction');
            $table->string('hero_button_1_text');
            $table->string('hero_button_1_url');
            $table->string('hero_button_1_active');
            $table->string('hero_button_2_text');
            $table->string('hero_button_2_url');
            $table->string('hero_button_2_active');

            // sneak peek
            $table->text('sneak_peek_title');
            $table->text('sneak_peek_button_text');

            // origins of creation
            $table->string('origins_image');
            $table->text('origins_title');
            $table->text('origins_content_1');
            $table->text('origins_content_2');

            // team 1
            $table->string('team_1_name');
            $table->string('team_1_title');
            $table->string('team_1_quote');
            $table->string('team_1_quote_source');
            $table->string('team_1_quote_date');
            $table->string('team_1_photo');
            $table->string('team_1_content_1');
            $table->string('team_1_content_2');

            // team 2
            $table->string('team_2_name');
            $table->string('team_2_title');
            $table->string('team_2_quote');
            $table->string('team_2_quote_source');
            $table->string('team_2_quote_date');
            $table->string('team_2_photo');
            $table->string('team_2_content_1');
            $table->string('team_2_content_2');

            // tour
            $table->text('tour_title');
            // tour 1
            $table->text('tour_1_image');
            $table->text('tour_1_title');
            $table->text('tour_1_introduction');
            $table->text('tour_1_button_text');
            $table->text('tour_1_button_link');
            $table->text('tour_1_button_active');
            // tour 2
            $table->text('tour_2_image');
            $table->text('tour_2_title');
            $table->text('tour_2_introduction');
            $table->text('tour_2_button_text');
            $table->text('tour_2_button_link');
            $table->text('tour_2_button_active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homepage_contents');
    }
};
