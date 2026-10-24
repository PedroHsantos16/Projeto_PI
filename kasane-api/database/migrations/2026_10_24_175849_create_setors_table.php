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
        Schema::create('setors', function (Blueprint $table) {
            $table->id('setor_id');
            $table->string('nome');
            $table->integer('quantidade_funcionarios')->nullable()->default(0);
            $table->foreignId('empresa_id')
                ->constrained('empresas', 'empresa_id')
                ->onDelete('cascade');
            $table->string('responsavel')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setors');
    }
};
