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
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id('comentario_id');
            $table->text('texto');
            $table->string('autor');
            $table->string('autor_foto');
            $table->string('autor_setor');
            $table->string('autor_cargo');
            $table->foreignId('funcionario_id')
                ->constrained('funcionarios', 'funcionario_id')
                ->onDelete('cascade');
            $table->foreignId('publicacao_id')
                ->constrained('publicacaos', 'publicacao_id')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentarios');
    }
};
