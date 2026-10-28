<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\LembreteController;
use App\Http\Controllers\PublicacaoController;
use App\Http\Controllers\SalvoController; 
use App\Http\Controllers\SetorController;
use Illuminate\Support\Facades\Route;

/*
    Route::apiResource('tabelas', TabelaController::class);

    Verbo HTTP	    URI / Caminho	      Ação (Método no Controller)	    Nome da Rota
    GET	            /tabelas              index (Listar todos)	            tabela.index
    POST	        /tabelas	          store (Criar novo)	            tabela.store
    GET	            /tabelas/{tabela}	  show (Visualizar um)	            tabela.show
    PUT/PATCH	    /tabelas/{tabela}	  update (Atualizar um)	            tabela.update
    DELETE	        /tabelas/{tabela}	  destroy (Deletar um)	            tabela.destroy

*/

Route::prefix('v1')->middleware('throttle:60,1')->group(function () {

    Route::post('/registrar/empresa', [AuthController::class, 'register_empresa']);
    Route::post('/login/empresa', [AuthController::class, 'login_empresa']);
    Route::post('/login/funcionario', [AuthController::class, 'login_funcionario']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        Route::post('/registrar/funcionario', [AuthController::class, 'register_funcionario']);
        
        Route::apiResource('empresas', EmpresaController::class);

        Route::apiResource('setors', SetorController::class);

        Route::apiResource('funcionarios', FuncionarioController::class);

        Route::apiResource('publicacaos', PublicacaoController::class);

        // Route::get('/vercomentarios', [ComentarioController::class, 'index']);
        Route::post('publicacaos/{publicacao}/comentarios', [ComentarioController::class, 'store']);    
        Route::apiResource('comentarios', ComentarioController::class);

        Route::apiResource('lembretes', LembreteController::class);

        Route::get('salvos', [SalvoController::class, 'index']);
        Route::post('publicacaos/{publicacao}/salvar', [SalvoController::class, 'store']);
        Route::delete('publicacaos/{publicacao}/salvar', [SalvoController::class, 'destroy']);
    });

    
});