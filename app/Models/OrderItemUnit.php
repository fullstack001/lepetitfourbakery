<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItemUnit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_id',
        'order_item_id',
        'product_id',
        'variation_id',
        'product_name',
        'variation_name',
        'variation_price',
        'quantity_per_variation',
        'quantity_in_box',
        'ordered_quantity',
        'thumbnail',
    ];

    protected $appends = ['quantity'];

    public function getQuantityAttribute()
    {
        return $this->quantity_per_variation * $this->quantity_in_box * $this->ordered_quantity;
    }
}
