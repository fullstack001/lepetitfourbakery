<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactPageContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'introduction',
    ];

    const DEFAULT_CONTENT = [
        'title' => 'Contact Us',
        'introduction' => 'Do you have a question, related to any of our services?
You can write to us using the form below.',
    ];
}
