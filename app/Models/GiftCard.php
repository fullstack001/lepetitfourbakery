<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GiftCard extends Model
{
    use HasFactory;

    protected $appends = ['amount_formatted', 'balance_formatted', 'expiration_formatted'];

    protected $fillable = [
        'order_id',
        'email',
        'number',
        'amount',
        'balance',
        'active',
    ];
    
    protected $casts = [
        'expires_at' => 'datetime',
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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getAmountFormattedAttribute()
    {
        return '$' . number_format($this->amount, 2, '.',',');
    }

    public function getBalanceFormattedAttribute()
    {
        return '$' . number_format($this->balance, 2, '.',',');
    }

    public function getExpirationFormattedAttribute()
    {
        return $this->expires_at->format('m/d/Y');
    }
}
