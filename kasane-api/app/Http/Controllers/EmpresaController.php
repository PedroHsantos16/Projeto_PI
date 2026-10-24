<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Empresa::all();
    }


    /**
     * Display the specified resource.
     */
    public function show(Empresa $empresa)
    {
        return $empresa;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Empresa $empresa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Empresa $empresa)
    {
        $dados = $request->validate([
            'razao_social'          => ['sometimes', 'string', 'max:100'],
            'cnpj'                  => ['sometimes', 'string', 'max:18', 'unique:empresas,cnpj,' . $empresa->empresa_id . ',empresa_id'],
            'email'                 => ['sometimes', 'email', 'max:255'],
            'telefone'              => ['sometimes', 'string', 'max:15'],
            'cep'                   => ['sometimes', 'string', 'max:9'],
            'rua'                   => ['sometimes', 'string', 'max:45'],
            'bairro'                => ['sometimes', 'string', 'max:45'],
            'cidade'                => ['sometimes', 'string', 'max:45'],
            'numero'                => ['sometimes', 'integer'],
            'quantidade_funcionarios' => ['sometimes', 'integer'],
        ]);

        $empresa->update($dados);
        return $empresa;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Empresa $empresa)
    {
        $empresa->delete();
        return response()->json(null, 204);
    }
}
