<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PostCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_code',
        'extra_fee',
        'active',
    ];

    protected $appends = ['extra_fee_formatted'];

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

    public function getExtraFeeFormattedAttribute()
    {
        return '$' . number_format($this->extra_fee, 2, '.',',');
    }
}
