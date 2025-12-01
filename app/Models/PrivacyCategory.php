<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivacyCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'position',
    ];

    public function paragraphs()
    {
        return $this->hasMany(PrivacyParagraph::class, 'category_id')->orderBy('position');
    }
}
