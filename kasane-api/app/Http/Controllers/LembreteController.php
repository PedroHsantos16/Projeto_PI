<?php

namespace App\Http\Controllers;

use App\Models\Lembrete;
use Illuminate\Http\Request;

class LembreteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Lembrete::all();
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
        $dados = $request->validate([
            'titulo'            => ['required', 'string', 'max:45'],
            'descricao'         => ['required', 'string'],
            'horario'           => ['sometimes', 'date'],
            'concluido'         => ['sometimes', 'boolean'],
            'funcionario_id'    => ['required', 'integer', 'exists:funcionarios,funcionario_id'],
        ]);

        $lembrete = Lembrete::create($dados);
        return response()->json($lembrete, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lembrete $lembrete)
    {
        return $lembrete;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lembrete $lembrete)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lembrete $lembrete)
    {
        $dados = $request->validate([
            'titulo'            => ['sometimes', 'string', 'max:45'],
            'descricao'         => ['sometimes', 'string'],
            'horario'           => ['sometimes', 'date'],
            'concluido'         => ['sometimes', 'boolean'],
            'funcionario_id'    => ['sometimes', 'integer', 'exists:funcionarios,funcionario_id'],
        ]);

        $lembrete->update($dados);
        return $lembrete;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lembrete $lembrete)
    {
        $lembrete->delete();
        return response()->json(null, 204);
    }
}
