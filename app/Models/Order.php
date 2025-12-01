<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $casts = [
        'datetime' => 'datetime',
    ];

    protected $appends = ['datetime_formatted', 'created_at_formatted', 'initial', 'total_quantity', 'notes_formatted'];

    protected $fillable = [
        'user_id',
        'subscription_id',
        'delivery_id',
        'stripe_session_id',
        'stripe_payment_intent_id',
        'number',
        'datetime',
        'full_name',
        'email',
        'phone',
        'amount',
        'amount_stripe',
        'amount_gift_card',
        'refunded_stripe',
        'refunded_gift_card',
        'type',
        'source',
        'status',
        'pickup_code',
        'notes',
    ];

    protected $hidden = [
        'full_name',
        'phone',
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

    public function subscription()
    {
        return $this->belongsTo(Subscription::class, 'subscription_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function getTotalQuantityAttribute()
    {
        return $this->items->sum('quantity');
    }

    public function getDatetimeFormattedAttribute()
    {
        return $this->datetime->format('M d, Y (H:i)');
    }

    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at->format('m/d/Y H:i');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'stripe_payment_intent_id', 'stripe_payment_intent_id');
    }

    public function getRefundedStripeDisplayAttribute()
    {
        return '$' . number_format($this->refunded_stripe, 2, '.',',');
    }

    public function getRefundedGiftCardDisplayAttribute()
    {
        return '$' . number_format($this->refunded_gift_card, 2, '.',',');
    }

    public function getRefundableStripeAttribute()
    {
        return $this->amount_stripe - $this->refunded_stripe;
    }

    public function getRefundableGiftCardAttribute()
    {
        return $this->amount_gift_card - $this->refunded_gift_card;
    }

    public function getRefundableStripeDisplayAttribute()
    {
        return '$' . number_format($this->refundable_stripe, 2, '.',',');
    }

    public function getRefundableGiftCardDisplayAttribute()
    {
        return '$' . number_format($this->refundable_gift_card, 2, '.',',');
    }

    public function refunds()
    {
        return $this->hasMany(Refund::class, 'order_id');
    }

    public function getInitialAttribute()
    {
        $initial = 'X';
        if($this->type === 'catering') $initial = 'M';
        if($this->type === 'add-on') $initial = 'A';
        if($this->type === 'subscription') $initial = 'S';
        return $initial;
    }

    public function getAmountFormattedAttribute()
    {
        if(is_null($this->amount)) return '';
        return '$' . number_format($this->amount, 2, '.',',');
    }

    public function getNotesFormattedAttribute()
    {
        if(is_null($this->notes)) return '';
        return nl2br($this->notes);
    }
}
