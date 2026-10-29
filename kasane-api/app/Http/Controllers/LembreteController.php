<?php

namespace App\Http\Controllers;

use App\Models\Lembrete;
use App\Models\Funcionario;
use Illuminate\Http\Request;

class LembreteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $funcionario = $request->user();
        abort_unless($funcionario instanceof Funcionario, 403);

        return Lembrete::where('funcionario_id', $funcionario->funcionario_id)
            ->where('concluido', false)
            ->orderBy('horario')
            ->get();
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
        abort_unless($funcionario instanceof Funcionario, 403);

        $dados = $request->validate([
            'titulo'    => ['required', 'string', 'max:255'],
            'descricao' => ['nullable', 'string'],
            'horario'   => ['required', 'date'],
        ]);

        $lembrete = Lembrete::create([
            ...$dados,
            'funcionario_id' => $funcionario->funcionario_id,
            'concluido'      => false,
        ]);

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
        abort_unless($lembrete->funcionario_id === $request->user()->funcionario_id, 403);

        $dados = $request->validate([
            'concluido' => ['sometimes', 'boolean'],
            'titulo'    => ['sometimes', 'string', 'max:255'],
            'descricao' => ['sometimes', 'nullable', 'string'],
            'horario'   => ['sometimes', 'date'],
        ]);

        $lembrete->update($dados);
        return $lembrete;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lembrete $lembrete)
    {
        abort_unless($lembrete->funcionario_id === $request->user()->funcionario_id, 403);

        $lembrete->delete();
        return response()->json(null, 204);
    }
}
