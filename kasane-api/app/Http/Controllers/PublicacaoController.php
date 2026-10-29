<?php

namespace App\Http\Controllers;

use App\Models\Publicacao;
use Illuminate\Http\Request;

class PublicacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $funcionario = $request->user();

        $setorId = $request->query('setor') === 'geral'
            ? $funcionario->empresas->setor_geral 
            : $funcionario->setor_id;

        return Publicacao::query()
            ->where('setor_id', $setorId)
            ->when($request->query('busca'), fn ($q, $busca) =>
                $q->where('titulo', 'ilike', "%{$busca}%")
            )
            ->withCount('comentarios as total_comentarios')
            ->withExists(['salvos as salvo' => fn ($q) =>
                $q->where('funcionario_id', $funcionario->funcionario_id)
            ])
            ->latest()
            ->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $funcionario = $request->user();

        $dados = request()->validate([
            'titulo'            => ['required', 'string', 'max:255'],
            'texto'             => ['required', 'string'],
            'setor_id'          => ['required', 'integer', 'exists:setors,setor_id'],
            //'funcionario_id'    => ['required', 'integer', 'exists:funcionarios,funcionario_id'],
            //'autor'             => ['sometimes', 'string', 'max:100'],
            //'autor_foto'        => ['sometimes', 'string', 'max:300'],
            //'autor_setor'       => ['sometimes', 'string', 'max:45'],
            //'autor_cargo'       => ['sometimes', 'string', 'max:45'],
        ]);

        $publicacao = Publicacao::create([
            'titulo'            => $dados['titulo'],
            'texto'             => $dados['texto'],
            'funcionario_id'    => $funcionario->funcionario_id,
            'setor_id'          => $dados['setor_id'],
            'autor'             => $funcionario->nome,
            'autor_foto'        => $funcionario->foto ?? null,
            'autor_setor'       => $funcionario->setors->nome,
            'autor_cargo'       => $funcionario->cargo,
        ]);
        return response()->json($publicacao, 201);
    }

   
    /**
     * Display the specified resource.
     */
    public function show(Publicacao $publicacao)
    {
        $publicacao->loadCount('comentarios as total_comentarios');
        $publicacao->load(['comentarios' => fn ($q) => $q->orderBy('created_at')]);

        $publicacao->salvo = $publicacao->salvos()
            ->where('funcionario_id', $publicacao->funcionario_id)
            ->exists();

        return $publicacao;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publicacao $publicacao)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Publicacao $publicacao)
    {
        $dados = $request->validate([
            'titulo'            => ['sometimes', 'string', 'max:255'],
            'texto'             => ['sometimes', 'string'],
            'funcionario_id'    => ['sometimes', 'integer', 'exists:funcionarios,funcionario_id'],
            'setor_id'          => ['sometimes', 'integer', 'exists:setors,setor_id'],
            'autor'             => ['sometimes', 'string', 'max:100'],
            'autor_foto'        => ['sometimes', 'string', 'max:300'],
            'autor_setor'       => ['sometimes', 'string', 'max:45'],
            'autor_cargo'       => ['sometimes', 'string', 'max:45'],
        ]);

        $publicacao->update($dados);
        return $publicacao;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publicacao $publicacao)
    {
        $publicacao->delete();
        return response()->json(null, 204);
    }
}
