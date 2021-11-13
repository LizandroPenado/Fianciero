<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Cuentas
Route::get('/cuentas', 'App\Http\Controllers\CuentaController@index'); //Mostrar todos los registros
Route::post('/cuentas', 'App\Http\Controllers\CuentaController@store'); //Crear registro
Route::put('/cuentas/{id}', 'App\Http\Controllers\CuentaController@update'); //Actualizar registro
Route::delete('/cuentas/{id}', 'App\Http\Controllers\CuentaController@destroy'); //Eliminar registro
Route::get('/getCuentaID', 'App\Http\Controllers\CuentaController@getCuentaID'); 

//Sectores
Route::get('/sectores', 'App\Http\Controllers\SectoresController@index'); //Mostrar todos los sectores
Route::get('/sectoresConActividad', 'App\Http\Controllers\SectoresController@sectoresConActividad'); //Mostrar todos los sectores con sus actividades

//ActividadEconomica
Route::get('/actividades', 'App\Http\Controllers\ActividadEconomicaController@index'); //Mostrar todas las actividades
Route::get('/actividadesPorSector', 'App\Http\Controllers\ActividadEconomicaController@actividadesPorSector'); //Mostrar todas las actividades por sector


//Empresas
Route::get('/empresas', 'App\Http\Controllers\EmpresasController@index'); //Mostrar todas las empresas
Route::post('/empresas', 'App\Http\Controllers\EmpresasController@store'); //Crear registro
Route::get('/ultimaEmpresa', 'App\Http\Controllers\EmpresasController@ultimaEmpresa'); //Mostrar todas las empresas

//Balances
Route::get('/balances', 'App\Http\Controllers\BalancesController@index'); //Mostrar todos los registros de balances
Route::post('/balances', 'App\Http\Controllers\BalancesController@store'); //Guarda los balances