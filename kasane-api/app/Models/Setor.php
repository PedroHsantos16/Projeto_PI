<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setor extends Model
{
    protected $table = 'setors';
    protected $primaryKey = 'setor_id';

    protected $fillable = ['nome', 'empresa_id', 'quantidade_funcionarios'];

    public function empresas()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id', 'empresa_id');
    }

    public function funcionarios()
    {
        return $this->hasMany(Funcionario::class, 'setor_id', 'setor_id');
    }

    public function publicacoes()
    {
        return $this->hasMany(Publicacao::class, 'setor_id', 'setor_id');
    }
}
