<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventMenuCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'uid',
        'name',
        'pickup_start_date',
        'pickup_end_date',
    ];

    public function getRouteKeyName()
    {
         return 'uid';
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'event_menu_products', 'event_menu_category_id', 'product_id')->where('deleted', false)->orderBy('position');
    }

    public function product_items()
    {
        return $this->hasMany(EventMenuProduct::class, 'event_menu_category_id')->orderBy('position');
    }
}
