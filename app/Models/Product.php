<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $appends = ['image_url', 'description_formatted'];

    protected $fillable = [
        'name',
        'description',
        'price',
        'price_string',
        'in_sneak_peek_menu',
        'in_catering_menu',
        'in_add_ons_menu',
        'has_image',
        'allow_client_note',
        'active',
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

    public function categories()
    {
        return $this->belongsToMany(ProductCategory::class, 'categories_products', 'product_id', 'category_id');
    }

    public function event_menu_categories()
    {
        return $this->belongsToMany(EventMenuCategory::class, 'event_menu_products', 'product_id', 'event_menu_category_id');
    }

    public function plans()
    {
        return $this->belongsToMany(SubscriptionPlan::class, 'subscription_products', 'product_id', 'plan_id');

    }

    public function variations()
    {
        return $this->hasMany(ProductVariation::class, 'product_id')->where('deleted',false);
    }

    public function getImageUrlAttribute()
    {
        $variation = $this->variations()->first();
        if ($variation) {
            return '/images/products/' . $variation->image;
        }
        return '/images/products/default.png';
    }

    public function getCategoryUidsAttribute()
    {
        return $this->categories->pluck('uid')->toArray();
    }

    public function getEventMenuCategoryUidsAttribute()
    {
        return $this->event_menu_categories->pluck('uid')->toArray();
    }

    public function getDescriptionFormattedAttribute()
    {
        return nl2br($this->description);
    }

}
