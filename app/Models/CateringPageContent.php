<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CateringPageContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'introduction',
    ];

    const DEFAULT_CONTENT = [
        'title' => 'Catering Menu',
        'introduction' => 'Hello everyone, with the current circumstances and not being able to re-open just yet, we\'re opening the online orders early. Keep in mind, in the future this page will be for catering orders only. You will notice that you have to select a time and a date for pickup at 1133 South Street, Needham MA, 02492. The times are between 9am and 2pm for pickups and we need a minimum of 48 hours notice, which is all done automatically when selecting your pickup date! Thank you so much for your support.',
    ];
}
