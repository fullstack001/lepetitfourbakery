<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SubscriptionPlan extends Model
{
    use HasFactory;

    const MAX_PRODUCTS = 9;

    protected $fillable = [
        'name',
        'french_name',
        'image',
        'position',
        'price_monthly',
        'price_biweekly',
        'price_weekly',
        'price_monthly_string',
        'price_biweekly_string',
        'price_weekly_string',
        'frequency',
        'has_delivery',
        'has_custom_boxes',
        'has_customization',
        'has_add_ons',
        'has_private_events',
        'active',
    ];

    protected $appends = [
        'placeholder_count',
        'price_monthly_formatted',
        'price_biweekly_formatted',
        'price_weekly_formatted',
    ];

    public function getPriceMonthlyFormattedAttribute()
    {
        return '$' . number_format(($this->price_monthly), 2, '.',',');
    }

    public function getPriceBiweeklyFormattedAttribute()
    {
        return '$' . number_format(($this->price_biweekly / 2), 2, '.',',');
    }

    public function getPriceWeeklyFormattedAttribute()
    {
        return '$' . number_format(($this->price_weekly / 4), 2, '.',',');
    }

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

    public function products()
    {
        return $this->belongsToMany(Product::class, 'subscription_products', 'plan_id', 'product_id')
            ->withPivot('quantity');
    }

    public function variations()
    {
        return $this->belongsToMany(ProductVariation::class, 'subscription_products', 'plan_id', 'variation_id')
            ->withPivot('quantity', 'position')
            ->with('product')
            ->orderBy('subscription_products.position');
    }

    public function getProductUidsAttribute()
    {
        return $this->products->pluck('uid')->toArray();
    }

    public function getVariationUidsAttribute()
    {
        return $this->variations->pluck('uid')->toArray();
    }

    public function getQuantitiesAttribute()
    {
        return $this->variations->mapWithKeys(function ($variation) {
            return [$variation->uid => $variation->pivot->quantity];
        });
    }

    public function getPlaceholderCountAttribute()
    {
        if($this->has_customization) {
            $user = auth()->user();
            $quantity = PremiumSubscriptionItem::where('user_id', $user->id)->sum('quantity');
        } else {
            $quantity = $this->variations->sum('pivot.quantity');
        }
        $remaining = self::MAX_PRODUCTS - $quantity;
        if($remaining < 0) $remaining = 0;
        return $remaining;
    }

}
