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
        Schema::create('lembretes', function (Blueprint $table) {
            $table->id('lembrete_id');
            $table->string('titulo');
            $table->text('descricao')->nullable();
            $table->date('horario')->nullable();
            $table->boolean('concluido')->default(false);
            $table->foreignId('funcionario_id')
                ->constrained('funcionarios', 'funcionario_id')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lembretes');
    }
};
