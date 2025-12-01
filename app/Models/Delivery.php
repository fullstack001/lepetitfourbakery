<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Delivery extends Model
{
    use HasFactory;

    protected $appends = ['datetime_formatted'];

    protected $fillable = [
        'user_id',
        'subscription_id',
        'plan_id',
        'datetime',
        'email',
        'phone',
        'full_name',
        'address_1',
        'address_2',
        'post_code',
        'city',
        'status',
    ];

    protected $casts = [
        'datetime' => 'datetime',
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

    public function getDatetimeFormattedAttribute()
    {
        return $this->datetime->format('M d, Y');
    }
    
    public function orders()
    {
        return $this->hasMany(Order::class, 'delivery_id');
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class, 'subscription_id');
    }
}
