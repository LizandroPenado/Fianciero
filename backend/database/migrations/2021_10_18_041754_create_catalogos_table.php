<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCatalogosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('catalogos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->string('nombreCuenta');
            $table->unsignedBigInteger('rubro_id');
            $table->unsignedBigInteger('tipoCuenta_id');
            $table->foreign('rubro_id')->references('id')->on('rubros')->onDelete('cascade');
            $table->foreign('tipoCuenta_id')->references('id')->on('tipos_cuentas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('catalogos');
    }
}
