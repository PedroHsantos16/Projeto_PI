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
        Schema::create('empresas', function (Blueprint $table) {
            $table->id('empresa_id');
            $table->string('razao_social', 255);
            $table->string('cnpj', 18)->unique();
            $table->string('email', 255)->unique();
            $table->integer('quantidade_funcionarios')->nullable()->default(0);
            $table->string('telefone', 15)->nullable();
            $table->string('cep', 9)->nullable();
            $table->string('rua', 45)->nullable();
            $table->string('numero')->nullable();
            $table->string('bairro', 255)->nullable();
            $table->string('senha_hash');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
