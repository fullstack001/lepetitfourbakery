<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Refund extends Model
{
    use HasFactory;

    protected $appends = ['amount_display'];

    protected $fillable = [
        'order_id',
        'stripe_charge_id',
        'amount',
        'status',
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

    public function getAmountDisplayAttribute()
    {
        return '$' . number_format($this->amount, 2, '.',',');
    }
}
