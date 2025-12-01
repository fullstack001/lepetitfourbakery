<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use MustVerifyEmail;
    use HasRoles;

    const POST_CODES = [
        '02481','02457','02462','02482','02494','02468','02492','02464','02466','02461','02493','02465','02495','02459','01760','02460','02453','02030','02454','02458','02132','01778','02467','02451','02477','02471','02472','02026','02452','02135','02027','02090','02445','01770','02478','01705','01704','01703','02447','02131','02130','02446','02456','02134','02136','01701','01773','02479','02138','02163','02476','02215','02052'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'can_subscribe',
        'email_verified_at',
        'stripe_id',
        'subscription_id',
        'subscription_plan_id',
        'billing_interval',
        'phone',
        'full_name',
        'address_1',
        'address_2',
        'post_code',
        'city',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
        'stripe_id',
        'subscription_id',
        'subscription_plan_id',
        'billing_interval',
        'phone',
        'full_name',
        'address_1',
        'address_2',
        'post_code',
        'city',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url', 'has_valid_postcode',
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

    public function subscription()
    {
        return $this->belongsTo(Subscription::class, 'subscription_id')
            ->where('status', 'active');
    }

    public function subscription_plan()
    {
        return $this->belongsTo(SubscriptionPlan::class, 'subscription_plan_id');
    }

    public function deliveries()
    {
        return $this->hasMany(Delivery::class, 'user_id');
    }

    public function relevant_deliveries()
    {
        return $this->deliveries()->where('subscription_id', $this->subscription_id);
    }

    public function future_relevant_deliveries()
    {
        return $this->relevant_deliveries()
            ->where('subscription_id', $this->subscription_id)
            ->where('datetime', '>', Carbon::now());
    }

    public function getNextDeliveryAttribute()
    {
        if (is_null($this->subscription_id)) return null;
        return $this->future_relevant_deliveries()
            ->where('status', 'initial')->first();
    }

    public function getNextDeliveryDateAttribute()
    {
        $subscription = $this->subscription;
        if(is_null($subscription)) {
            return null;
        } else {
            $next_delivery = $subscription->next_delivery;
        }
        if(is_null($next_delivery)) return null;
        return $next_delivery->format('M d, Y');
    }

    public function getNextAvailableDateAttribute()
    {
        $subscription = $this->subscription;
        if(is_null($subscription)) {
            return null;
        } else {
            $next_delivery = $subscription->next_delivery;
        }
        if(is_null($next_delivery)) return null;
        return $next_delivery;
    }

    public function getNextAvailableDateFormattedAttribute()
    {
        $next_available_date = $this->next_available_date;
        if(!is_null($next_available_date)) {
            return $next_available_date->format('M d, Y');
        }
        return null;
    }

    public function getHasValidPostcodeAttribute()
    {
        $post_codes = PostCode::where('active', true)->pluck('post_code')->toArray();
        return in_array($this->post_code, $post_codes);
    }

    public function getExtraDeliveryFeeAttribute()
    {
        $post_code = PostCode::where('post_code', $this->post_code)->first();
        if(is_null($post_code)) return ['value' => 0, 'formatted' => '$0.00'];
        return ['value' => $post_code->extra_fee, 'formatted' => $post_code->extra_fee_formatted];
    }

    public function premium_subscription_items()
    {
        return $this->hasMany(PremiumSubscriptionItem::class, 'user_id')->with(['product', 'variation']);
    }
}
