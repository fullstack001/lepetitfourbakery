<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomepageContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_background_image_desktop', 'hero_background_image_mobile', 'hero_title', 'hero_introduction', 'hero_button_1_text', 'hero_button_1_url', 'hero_button_1_active', 'hero_button_2_text', 'hero_button_2_url', 'hero_button_2_active', 'sneak_peek_title', 'sneak_peek_button_text', 'origins_image', 'origins_title', 'origins_content_1', 'origins_content_2', 'team_1_name', 'team_1_title', 'team_1_quote', 'team_1_quote_source', 'team_1_quote_date', 'team_1_photo', 'team_1_content_1', 'team_1_content_2', 'team_2_name', 'team_2_title', 'team_2_quote', 'team_2_quote_source', 'team_2_quote_date', 'team_2_photo', 'team_2_content_1', 'team_2_content_2', 'tour_title', 'tour_1_image', 'tour_1_title', 'tour_1_introduction', 'tour_1_button_text', 'tour_1_button_link', 'tour_1_button_active', 'tour_2_image', 'tour_2_title', 'tour_2_introduction', 'tour_2_button_text', 'tour_2_button_link', 'tour_2_button_active',
    ];

    const DEFAULT_CONTENT = [
        'hero_background_image_desktop' => "le-petit-four-bakery.jpg",
        'hero_background_image_mobile' => "le-petit-four-bakery-vertical.jpg",
        'hero_title' => "A trip to Paris
in a bakery box",
        'hero_introduction' => "Le Petit Four bakery brings the highest quality and authentic 100% homemade viennoiseries! It is like bringing a French boulangerie to “Chez Vous”! Our store will be situated at 380 Washington Street, Wellesley MA, 02481 and will be fully open in January.",
        'hero_button_1_text' => "Catering menu",
        'hero_button_1_url' => "https://lepetitfourbakery.com/catering-menu",
        'hero_button_1_active' => true,
        'hero_button_2_text' => "Coming soon",
        'hero_button_2_url' => "https://lepetitfourbakery.com/la-boutique",
        'hero_button_2_active' => false,
        'sneak_peek_title' => "Catering menu [sneak] peek",
        'sneak_peek_button_text' => "View catering menu",
        'origins_image' => "croissants.jpg",
        'origins_title' => "Origins of creation",
        'origins_content_1' => "Butter means flavor! The choice of butter is crucial to make delicious viennoiseries. Our viennoiseries are made with Beurre d'Isigny St-Mere AOP. It is a french butter made in accordance with traditions, and exclusively from the milks of Isigny terroir.",
        'origins_content_2' => "We also source our Flour from Grands Moulins de Paris: the legendary French company has been milling flour from fields from all over France for more than 100 years. They grow and mill 100% French wheat without any preservatives, providing nearly 1/3 of the professional bakers in France with their premium flours.",
        'team_1_name' => "Valérie Coullet",
        'team_1_title' => "the \"Lady of France\"",
        'team_1_quote' => "Getting those perfect flakes and layers is a labor of love — one that means getting up at 3 a.m. daily to get it right.",
        'team_1_quote_source' => "The Boston Globe",
        'team_1_quote_date' => "January 4, 2022",
        'team_1_photo' => "valerie-241228.jpg",
        'team_1_content_1' => "I am a French artisan and self-trained baker. Growing up in France I always loved the luring smell, flavor and texture of an authentic and delicious croissant! Flaky on the outside, tender on the inside with a mouthwatering, buttery finish. Can you picture sinking your teeth into such perfection? When working in the kitchen and shaping dough for these creations I feel such serenity! This sense of belonging is likely a feeling of heritage and tradition that I get from my family. I recently discovered that I have two generations of artisan bakers in my family lineage that were from Ischia, Italy! Twist of fate?",
        'team_1_content_2' => "After graduating with a double master degree in accountancy and organizational management, I have enjoyed 15 years of a successful career. I spent time with audit firms and Technology Companies as well as held an Executive Director position for a Senior Care Federation. After all these years working in what is often referred as a ‘respectable industry,’ I was then ready to chase my true passion and fulfill my life using my full potential to build my own business.

When I moved to United States four years ago, I knew it was the right moment and country to embrace change and push my boundaries when it comes to new adventures. Bring the French Boulangerie to ‘chez vous’, your home, with authentic creations warm from the oven! So was born, Le Petit Four, the Little Oven.

I am extremely excited to share these french viennoiseries and breads with you all. Each creation combines flavor with texture and elegance. It is my hope and goal to inspire and touch every person through my products, my passion as well as my culture.",
        'team_2_name' => "Romain Bernus",
        'team_2_title' => "Partner",
        'team_2_quote' => "Getting those perfect flakes and layers is a labor of love — one that means getting up at 3 a.m. daily to get it right.",
        'team_2_quote_source' => "The Boston Globe",
        'team_2_quote_date' => "January 4, 2022",
        'team_2_photo' => "romain-241228.jpg",
        'team_2_content_1' => "Hello hello, I'm Romain, Valerie's son. I moved to the US with the family when I was 16, I went to Needham High School for a few years.

I then went to college in San Francisco and I've worked in tech / finance for the last 6 years, moving around and working in San Francisco, Los Angeles, Dallas and now Boston.

More particularly, I worked in VIP partnerships and social media marketing, that's kind of my thing. I also create content on the side and started my journey to 1.5 million followers on social media in 2019 when I was finishing college.",
        'team_2_content_2' => "I just recently came back to help my mom full-time to make Le Petit Four a brand known all across New England. The goal is to take this to the next level and this is what I'm here for. I am now part-owner of Le Petit Four and you will see a lot of me on our socials.",
        'tour_title' => "Fancy a [tour]?",
        'tour_1_image' => "shop.jpg",
        'tour_1_title' => "La Boutique",
        'tour_1_introduction' => "Visit our store, meet our employees and come try our brand new French baked goods! We are located at 380 Washington Street in Wellesley.",
        'tour_1_button_text' => "Visit \"La Boutique\"",
        'tour_1_button_link' => "https://lepetitfourbakery.com/la-boutique",
        'tour_1_button_active' => false,
        'tour_2_image' => "baking.jpg",
        'tour_2_title' => "Catering Menu",
        'tour_2_introduction' => "Choose among our best viennoiseries in mini sizes so all can enjoy - great for your event, party or get together with family. These are not singles orders and require minimum quantities.",
        'tour_2_button_text' => "View the Menu",
        'tour_2_button_link' => "https://lepetitfourbakery.com/catering-menu",
        'tour_2_button_active' => true,
    ];
}
