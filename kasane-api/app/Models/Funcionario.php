<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;


class Funcionario extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'funcionarios';
    protected $primaryKey = 'funcionario_id';

    protected $fillable = [
        'nome', 'email', 'senha_hash', 'empresa_id', 'setor_id', 'ramal',
        'telefone', 'sexo', 'cargo', 'cpf', 'tipo_conta', 'foto'
    ];

    protected $hidden = ['senha_hash', 'remember_token'];

    public function getAuthPassword()
    {
        return $this->senha_hash;
    }

    public function empresas()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id', 'empresa_id');
    }

    public function setors()
    {
        return $this->belongsTo(Setor::class, 'setor_id', 'setor_id');
    }

    public function lembretes()
    {
        return $this->hasMany(Lembrete::class, 'funcionario_id', 'funcionario_id');
    }

    public function salvos()
    {
        return $this->hasMany(Salvo::class, 'funcionario_id', 'funcionario_id');
    }

    public function publicacoes()
    {
        return $this->hasMany(Publicacao::class, 'funcionario_id', 'funcionario_id');
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'funcionario_id', 'funcionario_id');
    }
}
