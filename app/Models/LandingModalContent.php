<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingModalContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
    ];

    const DEFAULT_CONTENT = [
        'title' => 'Subscribe to our newsletter to receive updates',
    ];
}
