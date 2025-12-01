<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TermsCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'position',
    ];

    public function paragraphs()
    {
        return $this->hasMany(TermsParagraph::class, 'category_id')->orderBy('position');
    }
}
