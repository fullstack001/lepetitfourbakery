<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;

    protected $casts = [
        'square_parsed_at' => 'datetime',
        'toast_parsed_at' => 'datetime',
        'last_end_of_day_update' => 'datetime',
     ];

    protected $fillable = [
        'our_address_1',
        'our_address_2',
        'our_city_postcode',
        'our_phone_number',
        'min_hours_before_pickup',
        'future_pickup_day_count',
        //
        'pickup_opening_hour',
        'pickup_closing_hour',
        'interval_minutes',
        'max_orders_per_slot',
        'board_script_on',
        'products_sold',
        //
        'square_parsed_at',
        'toast_parsed_at',
        //
        'force_board_refresh',
        'last_end_of_day_update',
        //
        'monday_opening_times',
        'tuesday_opening_times',
        'wednesday_opening_times',
        'thursday_opening_times',
        'friday_opening_times',
        'saturday_opening_times',
        'sunday_opening_times',
        //
        'meta_description_home',
        'meta_description_boutique',
        'meta_description_catering',
        'meta_description_contact',
    ];
}
