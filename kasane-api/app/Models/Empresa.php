<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Empresa extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'empresas';
    protected $primaryKey = 'empresa_id';

    protected $fillable = [
        'razao_social', 'cnpj', 'email', 'quantidade_funcionarios',
        'telefone', 'cep', 'rua', 'numero', 'bairro', 'senha_hash'
    ];

    protected $hidden = ['senha_hash', 'remember_token'];

    public function getAuthPassword()
    {
        return $this->senha_hash;
    }

    public function funcionarios()
    {
        return $this->hasMany(Funcionario::class, 'empresa_id', 'empresa_id');
    }

    public function setors()
    {
        return $this->hasMany(Setor::class, 'empresa_id', 'empresa_id');
    }
}
