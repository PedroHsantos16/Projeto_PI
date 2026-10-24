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
        Schema::create('salvos', function (Blueprint $table) {
            $table->id('salvo_id');
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
        Schema::dropIfExists('salvos');
    }
};
