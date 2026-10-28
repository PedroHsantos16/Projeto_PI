<?php

namespace App\Http\Controllers;
use App\Models\Funcionario;
use App\Models\Publicacao;
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
        abort_unless($funcionario instanceof Funcionario, 403);

        $salvos = Salvo::where('funcionario_id', $funcionario->funcionario_id)
            ->select('publicacao_id');

        return Publicacao::query()
            ->whereIn('publicacao_id', $salvos)
            ->when($request->query('busca'), fn ($q, $busca) =>
                $q->where('titulo', 'ilike', "%{$busca}%")
            )
            ->withCount('comentarios as total_comentarios')
            ->orderByDesc('publicacao_id')
            ->get()
            ->each(fn ($p) => $p->setAttribute('salvo', true));
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
    public function store(Request $request, Publicacao $publicacao)
    {
        $funcionario = $request->user();
        abort_unless($funcionario instanceof Funcionario, 403);

        Salvo::firstOrCreate([
            'funcionario_id' => $funcionario->funcionario_id,
            'publicacao_id'  => $publicacao->publicacao_id,
        ]);

        return response()->json(['salvo' => true], 201);
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
    public function destroy(Request $request, Publicacao $publicacao)
    {
        $funcionario = $request->user();
        abort_unless($funcionario instanceof Funcionario, 403);

        Salvo::where('funcionario_id', $funcionario->funcionario_id)
            ->where('publicacao_id', $publicacao->publicacao_id)
            ->delete();

        return response()->json(null, 204);
    }
}
