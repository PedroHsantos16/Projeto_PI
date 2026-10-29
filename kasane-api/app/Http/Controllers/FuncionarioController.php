<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class FuncionarioController extends Controller
{
    public function index(Request $request)
    {
        $empresa = $request->user();
        abort_unless($empresa instanceof Empresa, 403);

        return Funcionario::where('empresa_id', $empresa->empresa_id)
            ->with('setors')
            ->when($request->query('busca'), fn ($q, $busca) =>
                $q->where(fn ($w) => $w
                    ->where('nome', 'ilike', "%{$busca}%")
                    ->orWhere('cargo', 'ilike', "%{$busca}%"))
            )
            ->orderByDesc('funcionario_id')
            ->get();
    }

        public function store(Request $request)
    {
        $empresa = $request->user();
        abort_unless($empresa instanceof Empresa, 403);

        $dados = $request->validate([
            'nome'      => ['required', 'string', 'max:100'],
            'email'     => ['required', 'email', 'unique:funcionarios,email'],
            'cpf'       => ['required', 'string', 'max:14', 'unique:funcionarios,cpf'],
            'cargo'     => ['required', 'string', 'max:45'],
            'ramal'     => ['required', 'string', 'max:10'],
            'telefone'  => ['required', 'string', 'max:20'],
            'tipo_conta'=> ['required', Rule::in(['admin', 'comum'])],
            'setor_id'  => [
                'required', 'integer',
                Rule::exists('setors', 'setor_id')->where('empresa_id', $empresa->empresa_id),
            ],
            'senha'          => ['required', 'string', 'min:8']
        ]);

        $senhaTemporaria = "123456789";

        $funcionario = Funcionario::create([
            ...$dados,
            'empresa_id' => $empresa->empresa_id,
            'senha_hash' => Hash::make($dados['senha']),
        ]);

        return response()->json([
            'funcionario'      => $funcionario->load('setors'),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Funcionario $funcionario)
    {
        return $funcionario->load(['setors','empresas']);
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
