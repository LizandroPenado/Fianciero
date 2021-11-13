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
Route::post('/sectores', 'App\Http\Controllers\SectoresController@store'); //Crear registro
Route::put('/sectores/{id}', 'App\Http\Controllers\SectoresController@update'); //Actualizar registro
Route::delete('/sectores/{id}', 'App\Http\Controllers\SectoresController@destroy'); //Eliminar registro


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
Route::get('/balances/analisis', 'App\Http\Controllers\BalancesController@analisis'); //Informacion para analisis Horizontal
Route::get('/balances/periodo', 'App\Http\Controllers\BalancesController@periodo'); //Informacion de los periodos

//Rubros
Route::get('/rubros', 'App\Http\Controllers\RubrosController@index'); //Mostrar todos los registros de rubros

//Analisis horizontal
Route::get('/analisisHorizontal', 'App\Http\Controllers\AnalisisHorizontalController@index');
Route::post('/analisisHorizontal', 'App\Http\Controllers\AnalisisHorizontalController@store');
Route::get('/analisisHorizontal/existencia', 'App\Http\Controllers\AnalisisHorizontalController@existencia');

//Analisis vertical
Route::get('/analisisVertical', 'App\Http\Controllers\AnalisisVerticalController@index');
Route::post('/analisisVertical', 'App\Http\Controllers\AnalisisVerticalController@store');
Route::get('/analisisVertical/existencia', 'App\Http\Controllers\AnalisisVerticalController@existencia');


Route::get('/sectores', 'App\Http\Controllers\GestionSectorController@all')->name('sectores.all');
Route::post('/sectores', 'App\Http\Controllers\GestionSectorController@store')->name('sectores.store');
Route::get('/sectores/{sector}', 'App\Http\Controllers\GestionSectorController@show')->name('sectores.show');
Route::put('/sectores/{sector}', 'App\Http\Controllers\GestionSectorController@update')->name('sectores.update');
Route::delete('/sectores/{sector}', 'App\Http\Controllers\GestionSectorController@destory')->name('sectores.destroy');
