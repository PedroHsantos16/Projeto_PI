<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->id('funcionario_id');
            $table->string('nome');
            $table->string('email', 100)->unique();
            $table->string('telefone', 15)->nullable();
            $table->string('cpf', 14)->unique();
            $table->string('senha_hash');
            $table->rememberToken();
            $table->string('sexo', 1)->nullable();
            $table->string('cargo')->nullable();
            $table->string('tipo_conta')->default('comum');
            $table->integer('ramal')->nullable();
            $table->string('foto')->nullable();
            $table->foreignId('empresa_id')
                ->constrained('empresas', 'empresa_id')
                ->onDelete('cascade');
            $table->foreignId('setor_id')
                ->constrained('setors', 'setor_id')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('funcionarios');
    }
};
