<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPageContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','introduction','box_title','feature_1_icon','feature_1_title','feature_1_content','feature_2_icon','feature_2_title','feature_2_content','feature_3_icon','feature_3_title','feature_3_content','subscribed_box_instructions','subscribed_instructions',
    ];

    const DEFAULT_CONTENT = [
        'title' => 'Premium',
        'introduction' => 'What is a Le Petit Four "Premium"? A Le Petit Four Premium is a membership box that comes with unique benefits; the box contains 9 items and is delivered to your home on Saturdays or Sundays, between the hours of 7am and 10am. The box can be delivered monthly, once every two weeks or every week. The 9 items in the Le Petit Four box are fully customizable online on our new website once you create an account. You can customize the box before every delivery and you can choose among 15 different items to begin with. As a premium member, you will also have access to an "add-on menu". Make sure to check out the examples below for more details. Premium members will also be invited to Le Petit Four events, whether it is a private tasting, classes, parties and more.',
        'box_title' => ' What\'s in the box',
        'feature_1_icon' => 'mdi-tune',
        'feature_1_title' => 'Customization',
        'feature_1_content' => 'With [Customization], you’re able to choose what goes into your delivery subscription box.

You can choose up to 9 items in a premium box. Changes to your selection can be made up until 72 hours before your delivery date.',
        'feature_2_icon' => 'mdi-lock',
        'feature_2_title' => 'Secret menu',
        'feature_2_content' => 'With [Add-on Menu], you’re able to add more items to your scheduled subscription box delivery order. Family in town, get more delivered!

These add ons will be delivered to you along with your subscription box. Make sure to finalize your choice 3 days before your normal delivery date',
        'feature_3_icon' => 'mdi-calendar-star',
        'feature_3_title' => 'Private events',
        'feature_3_content' => 'Le Petit Four will host VIP invite-only private events four times a year or more.

These events may feature other Chefs, other companies offering great authentic products, tastings, classes, parties and more.',
        'subscribed_box_instructions' => 'If you wish to change your selection, you can do up to 48 hours before the date of delivery. You can select up to 9 items to add in your subscription box. Note: If you want to add more to your delivery you can visit the “Add-On Menu” which allows you to add an additional order to your delivery. You will be prompted to pay for that additional order when checking out below.',
        'subscribed_instructions' => 'If you wish to change your selection, you can do up to 48 hours before the date of delivery. You can select up to 9 items to add in your subscription box. Note: If you want to add more to your delivery you can visit the “Add-On Menu” which allows you to add an additional order to your delivery. You will be prompted to pay for that additional order when checking out below.',
    ];
}
