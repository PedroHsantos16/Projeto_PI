<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publicacao extends Model
{
    protected $table = 'publicacoes';
    protected $primaryKey = 'publicacao_id';

    protected $fillable = [
        'titulo', 'texto', 'autor', 'autor_foto', 'autor_setor', 'autor_cargo', 
        'quantidade_comentarios'
    ];

    public function funcionarios()
    {
        return $this->belongsTo(Funcionario::class, 'funcionario_id', 'funcionario_id');
    }

    public function setors()
    {
        return $this->belongsTo(Setor::class, 'setor_id', 'setor_id');
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'publicacao_id', 'publicacao_id');
    }

    public function salvos()
    {
        return $this->hasMany(Salvo::class, 'publicacao_id', 'publicacao_id');
    }
}
