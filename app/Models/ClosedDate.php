<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ClosedDate extends Model
{
    use HasFactory;
    
    protected $casts = [
        'datetime' => 'datetime',
    ];

    protected $fillable = [
        'datetime', 'reason',
    ];

    protected $appends = ['date_formatted'];

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

    public function getDateFormattedAttribute()
    {
        return $this->datetime->format('m.d.Y');
    }
}
