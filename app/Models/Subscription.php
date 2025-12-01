<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Subscription extends Model
{
    use HasFactory;

    const FREQUENCY_IN_DAYS_MONTHLY = 28;
    const FREQUENCY_IN_DAYS_BIWEEKLY = 14;
    const FREQUENCY_IN_DAYS_WEEKLY = 7;

    protected $appends = ['next_delivery_formatted'];

    protected $fillable = [
        'uid',
        'user_id',
        'subscription_plan_id',
        'billing_period_ends',
        'renews',
        'price',
        'stripe_checkout_session_id',
        'stripe_subscription_id',
        'stripe_plan_id',
        'status',
        'frequency',
        'delivery_day',
        'billing_interval',
        'billing_interval_count',
        'next_delivery',
        'stripe_event_created',
    ];

    protected $casts = [
        'billing_period_ends' => 'datetime',
        'next_delivery' => 'datetime',
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

    public function deliveries()
    {
        return $this->hasMany(Delivery::class, 'subscription_id');
    }

    public function getDeliveryAttribute()
    {
        return $this->deliveries()->where('status', 'initial')->orderBy('datetime', 'desc')->first();
    }

    public function getNextDeliveryFormattedAttribute()
    {
        return $this->next_delivery->format('M d, Y');
    }

    public function plan()
    {
        return $this->belongsTo(SubscriptionPlan::class, 'subscription_plan_id');
    }


}
