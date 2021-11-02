<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuenta extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'rubro_id', 'tipo_id','empresa_id'];
    function balance(){
        return $this->belongsTo('\App\Models\balances');
    }
    
}
