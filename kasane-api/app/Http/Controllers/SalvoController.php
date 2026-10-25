<?php

namespace App\Http\Controllers;

use App\Models\Salvo;
use Illuminate\Http\Request;

class SalvoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $funcionario = $request->user();
        return Salvo::where('funcionario_id', $funcionario->funcionario_id)->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $funcionario = $request->user();

        $dados = request()->validate([
            //'funcionario_id'    => ['required', 'integer', 'exists:funcionarios,funcionario_id'],
            'publicacao_id'     => ['required', 'integer', 'exists:publicacaos,publicacao_id'],
        ]);

        $salvo = Salvo::create([
            'funcionario_id'    => $funcionario->funcionario_id,
            'publicacao_id'     => $dados['publicacao_id'],
        ]);
        
        return response()->json($salvo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Salvo $salvo)
    {
        return $salvo;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Salvo $salvo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Salvo $salvo)
    {
        $dados = request()->validate([
            'funcionario_id'    => ['sometimes', 'integer', 'exists:funcionarios,funcionario_id'],
            'publicacao_id'     => ['sometimes', 'integer', 'exists:publicacaos,publicacao_id'],
        ]);

        $salvo->update($dados);
        return $salvo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Salvo $salvo)
    {
        $salvo->delete();
        return response()->json(null, 204);
    }
}
