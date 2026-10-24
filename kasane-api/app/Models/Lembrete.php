<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lembrete extends Model
{
    protected $table = 'lembretes';
    protected $primaryKey = 'lembrete_id';

    protected $fillable = [
        'titulo', 'descricao', 'horario', 'funcionario_id', 'concluido'
    ];

    public function funcionarios()
    {
        return $this->belongsTo(Funcionario::class, 'funcionario_id', 'funcionario_id');
    }

}
