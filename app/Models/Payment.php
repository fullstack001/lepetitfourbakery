<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'stripe_charge_id',
        'stripe_payment_intent_id',
        'amount',
        'amount_captured',
        'card_last_4',
        'status',
    ];
    
    protected $appends = ['amount_display', 'amount_captured_display'];

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

    public function orders()
    {
        return $this->hasMany(Order::class, 'stripe_payment_intent_id', 'stripe_payment_intent_id');
    }

    public function getAmountDisplayAttribute()
    {
        return '$' . number_format(($this->amount / 100), 2, '.',',');
    }

    public function getAmountCapturedDisplayAttribute()
    {
        return '$' . number_format(($this->amount / 100), 2, '.',',');
    }
}
