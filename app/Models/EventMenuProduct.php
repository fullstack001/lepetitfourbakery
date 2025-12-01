<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventMenuProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_menu_category_id',
        'product_id',
        'position',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
