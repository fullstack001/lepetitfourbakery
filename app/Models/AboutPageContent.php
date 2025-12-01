<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutPageContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','introduction','module_1_image','module_1_title','module_1_button_text','module_1_button_link','module_2_image','module_2_title','module_2_button_text','module_2_button_link','module_3_image','module_3_title','module_3_button_text','module_3_button_link','module_4_image','module_4_title','module_4_button_text','module_4_button_link','module_5_image','module_5_title','module_5_button_text','module_5_button_link','module_6_image','module_6_title','module_6_button_text','module_6_button_link','module_7_image','module_7_title','module_7_button_text','module_7_button_link','module_8_image','module_8_title','module_8_button_text','module_8_button_link','module_9_image','module_9_title','module_9_button_text','module_9_button_link','testimonials_title','testimonials_introduction','testimonial_1_name','testimonial_1_content','testimonial_2_name','testimonial_2_content','testimonial_3_name','testimonial_3_content','instructions_baked_goods_title','instructions_baked_goods_youtube_video_id',
    ];

    const DEFAULT_CONTENT = [
        'title' => 'La Boutique',
        'introduction' => 'We invite you to come visit our new store in Wellesley at 380 Washington Street. We can’t wait to see you there! In the meantime, enjoy some beautiful pictures of our boutique, some of our achievements and the great people we work with! Also make sure to check out what people say about us online. See you soon at the store!',
        'module_1_image' => 'tour.jpg',
        'module_1_title' => 'View our menu',
        'module_1_button_text' => 'Open',
        'module_1_button_link' => 'https://lepetitfourbakery.com/documents/LPFMenu.pdf',
        'module_2_image' => 'newspaper-article.jpg',
        'module_2_title' => 'Featured in the Boston Globe!',
        'module_2_button_text' => 'Read article',
        'module_2_button_link' => 'https://www.bostonglobe.com/2022/01/04/lifestyle/what-it-takes-master-croissant/',
        'module_3_image' => null,
        'module_3_title' => null,
        'module_3_button_text' => null,
        'module_3_button_link' => null,
        'module_4_image' => null,
        'module_4_title' => null,
        'module_4_button_text' => null,
        'module_4_button_link' => null,
        'module_5_image' => null,
        'module_5_title' => null,
        'module_5_button_text' => null,
        'module_5_button_link' => null,
        'module_6_image' => null,
        'module_6_title' => null,
        'module_6_button_text' => null,
        'module_6_button_link' => null,
        'module_7_image' => null,
        'module_7_title' => null,
        'module_7_button_text' => null,
        'module_7_button_link' => null,
        'module_8_image' => null,
        'module_8_title' => null,
        'module_8_button_text' => null,
        'module_8_button_link' => null,
        'module_9_image' => null,
        'module_9_title' => null,
        'module_9_button_text' => null,
        'module_9_button_link' => null,
        'testimonials_title' => 'What [People] Say...',
        'testimonials_introduction' => 'Our clients are at the heart of everything we do.',
        'testimonial_1_name' => 'Charles',
        'testimonial_1_content' => 'I must say le petit Four is fantastic Valerie is an excellent baker I had her croissants 🥐 today and a few other things and I was blown away simply the best you will not find another Croissant like Valerie’s.

If you want to experience the original please go to le petit four and see Valerie I guarantee you.',
        'testimonial_2_name' => 'Parker',
        'testimonial_2_content' => 'I am flabbergasted. I really thought I understood a great croissant. I mean for God sake\'s, I have sampled them from the very best Parisian bakeries so I figured I had a decent base-line.

And then I try Le Petit Four and realize I have actually never had a truly top tier croissant. Extraordinary. Without a doubt, the best croissant I have ever had.',
        'testimonial_3_name' => 'Dan',
        'testimonial_3_content' => 'These are some of the best croissants and danishes I\'ve ever had in my life. Do yourself a favor and give this place a try. I still cannot get over how good this is.',
        'instructions_baked_goods_title' => 'Instructions
[Baked] Goods',
        'instructions_baked_goods_youtube_video_id' => null,
    ];
}
