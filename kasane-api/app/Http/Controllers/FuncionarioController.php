<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;

class FuncionarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Funcionario::all();
    }

    /**
     * Display the specified resource.
     */
    public function show(Funcionario $funcionario)
    {
        return $funcionario;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Funcionario $funcionario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Funcionario $funcionario)
    {
        $dados = $request->validate([
            'nome'           => ['sometimes', 'string', 'max:100'],
            'email'          => ['sometimes', 'email', 'max:100', 'unique:funcionarios,email,' . $funcionario->funcionario_id . ',funcionario_id'],
            'telefone'       => ['sometimes', 'string', 'max:15', 'unique:funcionarios,telefone,' . $funcionario->funcionario_id . ',funcionario_id'],
            'cpf'            => ['sometimes', 'string', 'max:14', 'unique:funcionarios,cpf,' . $funcionario->funcionario_id . ',funcionario_id'],
            'cargo'          => ['sometimes', 'string', 'max:45'],
            'tipo_conta'     => ['sometimes', 'string', 'max:45'],
            'empresa_id'     => ['sometimes', 'integer', 'exists:empresas,empresa_id'],
            'setor_id'       => ['sometimes', 'integer', 'exists:setores,setor_id'],
            'sexo'           => ['sometimes', 'string', 'max:10'],
            'foto'           => ['sometimes', 'string'],
            'ramal'          => ['sometimes', 'string', 'max:10'],
        ]);

        $funcionario->update($dados);
        return $funcionario;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Funcionario $funcionario)
    {
        $funcionario->delete();
        return response()->json(null, 204);
    }
}
