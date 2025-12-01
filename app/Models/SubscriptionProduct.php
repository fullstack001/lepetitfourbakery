<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SubscriptionProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_id',
        'product_id',
        'variation_id',
        'quantity',
        'position',
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
    
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    
    public function variation()
    {
        return $this->belongsTo(ProductVariation::class, 'variation_id');
    }
}
