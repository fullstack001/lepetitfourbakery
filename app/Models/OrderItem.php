<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_id',
        'product_id',
        'variation_id',
        'product_name',
        'variation_name',
        'variation_price',
        'quantity',
        'is_box',
        'amount',
        'client_note',
        'thumbnail',
        'status',
        'event_menu_category_uid',
    ];

    protected $appends = ['amount_formatted'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uid = (string) Str::uuid();
        });
    }

    public function getRouteKeyName()
    {
        return 'uid';
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function variation()
    {
        return $this->belongsTo(ProductVariation::class, 'variation_id');
    }

    public function units()
    {
        return $this->hasMany(OrderItemUnit::class, 'order_item_id');
    }

    public function getAmountFormattedAttribute()
    {
        if(is_null($this->amount)) return '';
        if(is_string($this->amount)) return $this->amount;
        return '$' . number_format($this->amount, 2, '.',',');
    }
}
