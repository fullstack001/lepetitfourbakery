<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TeamMember extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id', 'name', 'permission',
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
}
