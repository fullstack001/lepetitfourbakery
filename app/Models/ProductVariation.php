<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProductVariation extends Model
{
    use HasFactory;

    protected $appends = ['image_url', 'price_formatted'];

    protected $fillable = [
        'product_id',
        'name',
        'items',
        'price',
        'price_string',
        'image',
        'is_box',
        'deleted',
        'weekend_only',
    ];

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

    public function box_products()
    {
        return $this->hasMany(BoxProduct::class, 'parent_variation_id');
    }

    public function getBoxProductUidsAttribute()
    {
        return $this->box_products
            ->map(fn($box_product) => $box_product->variation?->uid)
            ->filter()
            ->values()
            ->all();
    }

    public function getBoxProductQuantitiesAttribute()
    {
        return $this->box_products
            ->mapWithKeys(function ($box_product) {
                return $box_product->variation ? [$box_product->variation->uid => $box_product->quantity] : [];
            })
            ->all();
    }

    public function getBoxContentsAttribute()
    {
        $quantities = $this->box_products->pluck('quantity', 'id');

        $productCount = $quantities->count();
        $itemCount = $quantities->sum();

        return "{$productCount} product" . ($productCount > 1 ? 's' : '') .
            ", {$itemCount} item" . ($itemCount > 1 ? 's' : '');

    }



    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function getPriceFormattedAttribute()
    {
        $price = $this->price / 100;
        return number_format($price, 2, '.', ',');
    }

    public function getImageUrlAttribute()
    {
        return '/images/products/' . $this->image;
    }

    public function calculatePossibleQuantity($total, $currently)
    {
        return SubscriptionPlan::MAX_PRODUCTS - ($total - $currently);
    }
}
