<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salvo extends Model
{
    protected $table = 'salvos';
    protected $primaryKey = 'salvo_id';

    protected $fillable = [
        'funcionario_id', 'publicacao_id'
    ];

    public function funcionarios()
    {
        return $this->belongsTo(Funcionario::class, 'funcionario_id', 'funcionario_id');
    }

    public function publicacoes()
    {
        return $this->belongsTo(Publicacao::class, 'publicacao_id', 'publicacao_id');
    }
}
