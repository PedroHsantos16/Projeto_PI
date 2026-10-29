<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Setor;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SetorController extends Controller
{
    public function index(Request $request)
    {
        $empresa = $request->user();
        abort_unless($empresa instanceof Empresa, 403);

        return Setor::where('empresa_id', $empresa->empresa_id)
            ->orderBy('nome')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $empresa = $request->user();
        abort_unless($empresa instanceof Empresa, 403);

        $dados = $request->validate([
            'nome' => [
                'required', 'string', 'max:45',
                Rule::unique('setors', 'nome')->where('empresa_id', $empresa->empresa_id),
            ],
        ]);

        $setor = Setor::create([
            ...$dados,
            'empresa_id' => $empresa->empresa_id,
        ]);

        return response()->json($setor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Setor $setor)
    {
        return $setor;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Setor $setor)
    {
        $dados = $request->validate([
            'nome'                      => ['sometimes', 'string', 'max:100'],
            'empresa_id'                => ['sometimes', 'integer', 'exists:empresas,empresa_id'],
            'quantidade_funcionarios'   => ['sometimes', 'integer'],
            'responsavel'               => ['sometimes', 'string', 'max:100'],
        ]);

        $setor->update($dados);
        return $setor;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setor $setor)
    {
        $setor->delete();
        return response()->json(null, 204);
    }
}
