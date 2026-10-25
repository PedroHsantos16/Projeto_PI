<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /* 
        $query = Comentario::query();
        
        if($query = $request->query('publicacao_id'))
        {
            $query = Comentario::where('publicacao_id', $query);
        } 
        
        return $query->all();
        */
        
        Return Comentario::where('publicacao_id', $request->query('publicacao_id'))->get();
    }


    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $funcionario = $request->user();

        $dados = request()->validate([
            'texto'             => ['required', 'string'],
            'publicacao_id'     => ['required', 'integer', 'exists:publicacaos,publicacao_id'],
            //'funcionario_id'    => ['required', 'integer', 'exists:funcionarios,funcionario_id'],
            //'autor'             => ['sometimes', 'string', 'max:100'],
            //'autor_foto'        => ['sometimes', 'string', 'max:300'],
            //'autor_setor'       => ['sometimes', 'string', 'max:45'],
            //'autor_cargo'       => ['sometimes', 'string', 'max:45'],
        ]);

        $comentario = Comentario::create([
            'texto'             => $dados['texto'],
            'publicacao_id'     => $dados['publicacao_id'],
            'funcionario_id'    => $funcionario->funcionario_id,
            'autor'             => $funcionario->nome,
            'autor_foto'        => $funcionario->foto ?? null,
            'autor_setor'       => $funcionario->setors->nome,
            'autor_cargo'       => $funcionario->cargo,
        ]);

        return response()->json($comentario, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        return $comentario;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comentario $comentario)
    {
        $dados = $request->validate([
            'texto'             => ['sometimes', 'string'],
            'publicacao_id'     => ['sometimes', 'integer', 'exists:publicacoes,publicacao_id'],
            'funcionario_id'    => ['sometimes', 'integer', 'exists:funcionarios,funcionario_id'],
            'autor'             => ['sometimes', 'string', 'max:100'],
            'autor_foto'        => ['sometimes', 'string', 'max:300'],
            'autor_setor'       => ['sometimes', 'string', 'max:45'],
            'autor_cargo'       => ['sometimes', 'string', 'max:45'],
        ]);

        $comentario->update($dados);
        return $comentario;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        $comentario->delete();
        return response()->json(null, 204);
    }
}
