<?php

use App\Models\AboutPageContent;
use App\Models\CateringPageContent;
use App\Models\ContactPageContent;
use App\Models\HomepageContent;
use App\Models\LandingModalContent;
use App\Models\SubscriptionPageContent;
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
        Schema::table('homepage_contents', function (Blueprint $table) {
            $table->longText('hero_introduction')->change();
            $table->longText('team_1_content_1')->change();
            $table->longText('team_1_content_2')->change();
            $table->longText('team_2_content_1')->change();
            $table->longText('team_2_content_2')->change();
            $table->longText('origins_content_1')->change();
            $table->longText('origins_content_2')->change();
            $table->longText('tour_1_introduction')->change();
            $table->longText('tour_2_introduction')->change();
            $table->boolean('hero_button_1_active')->change();
            $table->boolean('hero_button_2_active')->change();
            $table->boolean('tour_1_button_active')->change();
            $table->boolean('tour_2_button_active')->change();
        });
        Schema::table('catering_page_contents', function (Blueprint $table) {
            $table->longText('introduction')->change();
        });
        Schema::table('contact_page_contents', function (Blueprint $table) {
            $table->longText('introduction')->change();
        });
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->longText('introduction')->change();
            $table->longText('testimonials_introduction')->change();
            $table->longText('testimonial_1_content')->change();
            $table->longText('testimonial_2_content')->change();
            $table->longText('testimonial_3_content')->change();
        });
        Schema::table('subscription_page_contents', function (Blueprint $table) {
            $table->longText('introduction')->change();
            $table->longText('feature_1_content')->change();
            $table->longText('feature_2_content')->change();
            $table->longText('feature_3_content')->change();
        });
        // home
        $content = HomepageContent::first();
        if(is_null($content)) {
            HomepageContent::create(HomepageContent::DEFAULT_CONTENT);
        } else {
            $content->update(HomepageContent::DEFAULT_CONTENT);
        }
        // la boutique
        $content = AboutPageContent::first();
        if(is_null($content)) {
            AboutPageContent::create(AboutPageContent::DEFAULT_CONTENT);
        } else {
            $content->update(AboutPageContent::DEFAULT_CONTENT);
        }
        // catering menu
        $content = CateringPageContent::first();
        if(is_null($content)) {
            CateringPageContent::create(CateringPageContent::DEFAULT_CONTENT);
        } else {
            $content->update(CateringPageContent::DEFAULT_CONTENT);
        }
        // subscription
        $content = SubscriptionPageContent::first();
        if(is_null($content)) {
            SubscriptionPageContent::create(SubscriptionPageContent::DEFAULT_CONTENT);
        } else {
            $content->update(SubscriptionPageContent::DEFAULT_CONTENT);
        }
        // contact us
        $content = ContactPageContent::first();
        if(is_null($content)) {
            ContactPageContent::create(ContactPageContent::DEFAULT_CONTENT);
        } else {
            $content->update(ContactPageContent::DEFAULT_CONTENT);
        }
        // modal window
        $content = LandingModalContent::first();
        if(is_null($content)) {
            LandingModalContent::create(LandingModalContent::DEFAULT_CONTENT);
        } else {
            $content->update(LandingModalContent::DEFAULT_CONTENT);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
