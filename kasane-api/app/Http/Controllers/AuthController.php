<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register_funcionario(Request $request)
    {
        $dados = $request->validate([
            'nome'           => ['required', 'string', 'max:100'],
            'email'          => ['required', 'email', 'max:100', 'unique:funcionarios,email'],
            'telefone'       => ['required', 'string', 'max:15', 'unique:funcionarios,telefone'],
            'cpf'            => ['required', 'string', 'max:14', 'unique:funcionarios,cpf'],
            'cargo'          => ['required', 'string', 'max:45'],
            'tipo_conta'     => ['required', 'string', 'max:45'],
            'empresa_id'     => ['required', 'integer', 'exists:empresas,empresa_id'],
            'setor_id'       => ['required', 'integer', 'exists:setors,setor_id'],
            'sexo'           => ['sometimes', 'string', 'max:1'],
            'foto'           => ['sometimes', 'string', 'max:300'],
            'ramal'          => ['sometimes', 'integer'],
            'senha'          => ['required', 'string', 'min:8']
        ]);

        $funcionario = Funcionario::create([
            'nome'            => $dados['nome'],
            'email'           => $dados['email'],
            'telefone'        => $dados['telefone'],
            'cpf'             => $dados['cpf'],
            'cargo'           => $dados['cargo'],
            'tipo_conta'      => $dados['tipo_conta'],
            'empresa_id'      => $dados['empresa_id'],
            'setor_id'        => $dados['setor_id'],
            'sexo'            => $dados['sexo'] ?? null,
            'foto'            => $dados['foto'] ?? null,
            'ramal'           => $dados['ramal'] ?? null,
            'senha_hash'      => Hash::make($dados['senha'])
        ]);

        $nomeToken = $funcionario->nome . '-' . now()->timestamp;
        $token = $funcionario->createToken($nomeToken)->plainTextToken;

        return response()->json(['funcionario' => $funcionario, 'token' => $token, 'mensagem' => 'Registro realizado com sucesso.'], 201);
    }

    public function register_empresa(Request $request)
    {
        $dados = $request->validate([
            'razao_social'            => ['required', 'string', 'max:100'],
            'cnpj'                    => ['required', 'string', 'max:18', 'unique:empresas,cnpj'],
            'email'                   => ['required', 'email', 'max:255', 'unique:empresas,email'],
            'telefone'                => ['required', 'string', 'max:15', 'unique:empresas,telefone'],
            'cep'                     => ['sometimes', 'string', 'max:9'],
            'rua'                     => ['sometimes', 'string', 'max:45'],
            'bairro'                  => ['sometimes', 'string', 'max:45'],
            'numero'                  => ['sometimes', 'integer'],
            'senha'                   => ['required', 'string', 'min:8']
        ]);

        $empresa = Empresa::create([
            'razao_social'    => $dados['razao_social'],
            'cnpj'            => $dados['cnpj'],
            'email'           => $dados['email'],
            'telefone'        => $dados['telefone'],
            'cep'             => $dados['cep'] ?? null,
            'rua'             => $dados['rua'] ?? null,
            'bairro'          => $dados['bairro'] ?? null,
            'numero'          => $dados['numero'] ?? null,
            'senha_hash'      => Hash::make($dados['senha'])
        ]);

        $nomeToken = $empresa->razao_social . '-' . now()->timestamp;
        $token = $empresa->createToken($nomeToken)->plainTextToken;

        return response()->json(['empresa' => $empresa, 'token' => $token, 'mensagem' => 'Registro realizado com sucesso.'], 201);
    }

    public function login_funcionario(Request $request)
    {
        // Talvez mudar password para senha
        $credenciais = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'], 
        ]);

        if (! Auth::attempt($credenciais)) {
            return response()->json(['erro' => 'Credenciais inválidas.'], 401);
        }

        $funcionario = Auth::user();
        $nomeToken = $funcionario->nome . '-' . now()->timestamp;
        $token = $funcionario->createToken($nomeToken)->plainTextToken;

        return response()->json(['funcionario' => $funcionario, 'token' => $token, 'mensagem' => 'Login realizado com sucesso.']);
    }

    public function login_empresa(Request $request)
    {
        $credenciais = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'], 
        ]);

        if (! Auth::attempt($credenciais)) {
            return response()->json(['erro' => 'Credenciais inválidas.'], 401);
        }

        $empresa = Auth::user();
        $nomeToken = $empresa->razao_social . '-' . now()->timestamp;
        $token = $empresa->createToken($nomeToken)->plainTextToken;

        return response()->json(['empresa' => $empresa, 'token' => $token, 'mensagem' => 'Login realizado com sucesso.']);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete(); 
        return response()->json(['mensagem' => 'Logout realizado com sucesso.']);
    }
}