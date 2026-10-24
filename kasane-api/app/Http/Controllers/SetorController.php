<?php

namespace App\Http\Controllers;

use App\Models\Setor;
use Illuminate\Http\Request;

class SetorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Setor::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dados = $request->validate([
            'nome'                      => ['required', 'string', 'max:100'],
            'empresa_id'                => ['required', 'integer', 'exists:empresas,empresa_id'],
            'quantidade_funcionarios'   => ['sometimes', 'integer'],
            'responsavel'               => ['sometimes', 'string', 'max:100'],
        ]);

        $setor = Setor::create($dados);
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
