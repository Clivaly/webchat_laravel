<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['from', 'to', 'content'];

    protected $casts = [
        'properties' => 'collection',
        'created_at' => 'datetime:d/m/Y H:i:s',
    ];
    protected $dates = ['created_at'];
}
