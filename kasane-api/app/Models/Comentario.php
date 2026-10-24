<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $table = 'comentarios';
    protected $primaryKey = 'comentario_id';

    protected $fillable = [
        'texto', 'funcionario_id', 'publicacao_id',
        'autor', 'autor_foto', 'autor_setor', 'autor_cargo'
    ];

    public function funcionarios()
    {
        return $this->belongsTo(Funcionario::class, 'funcionario_id', 'funcionario_id');
    }

    public function publicacaos()
    {
        return $this->belongsTo(Publicacao::class, 'publicacao_id', 'publicacao_id');
    }
}
