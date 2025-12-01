<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductRefresh extends Model
{
    use HasFactory;
    
    protected $casts = [
        'datetime' => 'datetime',
    ];

    protected $appends = ['formatted'];
    
    protected $fillable = [
        'datetime',
    ];

    public function getFormattedAttribute()
    {
        return $this->datetime->format('d/m/Y H:i:s');
    }
}
