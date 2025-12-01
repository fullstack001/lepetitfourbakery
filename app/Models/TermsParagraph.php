<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TermsParagraph extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'content',
        'position',
    ];

    protected $appends = ['content_formatted'];

    public function getContentFormattedAttribute()
    {
        return nl2br($this->content);
    }
}
