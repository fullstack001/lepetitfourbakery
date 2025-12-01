<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BoxProduct extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uid = (string) Str::uuid();
        });
    }

    protected $fillable = [
        'parent_product_id',
        'parent_variation_id',
        'product_id',
        'variation_id',
        'quantity',
    ];

    public function getRouteKeyName()
    {
        return 'uid';
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function variation()
    {
        return $this->belongsTo(ProductVariation::class, 'variation_id');
    }

    public function getDisplayDataAttribute()
    {
        $product = $this->product;
        $variation = $this->variation;
        return [
            'image' => $variation->image_url,
            'product_name' => $product->name,
            'variation_name' => $variation->name,
            'quantity' => 'x' . $this->quantity,
        ];
    }
}
