<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingModal extends Model
{
    use HasFactory;

    protected $casts = [
        'active_begin_date' => 'datetime',
        'active_end_date' => 'datetime',
     ];

    protected $appends = ['title_top_formatted', 'content_top_formatted', 'title_bottom_formatted', 'content_bottom_formatted'];

    protected $fillable = [
        'code',
        'title_top',
        'content_top',
        'title_bottom',
        'content_bottom',
        'image',
        'opacity',
        'delay_seconds',
        'active_begin_date',
        'active_end_date',
        'show_newsletter_form',
    ];

    public function getTitleTopFormattedAttribute()
    {
        if(is_null($this->title_top)) return null;
        return nl2br($this->title_top);
    }

    public function getContentTopFormattedAttribute()
    {
        if(is_null($this->content_top)) return null;
        return nl2br($this->content_top);
    }

    public function getTitleBottomFormattedAttribute()
    {
        if(is_null($this->title_bottom)) return null;
        return nl2br($this->title_bottom);
    }

    public function getContentBottomFormattedAttribute()
    {
        if(is_null($this->content_bottom)) return null;
        return nl2br($this->content_bottom);
    }

}
