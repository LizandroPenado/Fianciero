<?php

namespace App\Http\Controllers;

use App\Models\balances;
use App\Models\Cuenta;
use Illuminate\Http\Request;

class BalancesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $balance = new Balances();
        $balance->anio = $request->anio;
        $balance->valor = $request->valor;
        $balance->empresa_id = $request->empresa_id;
        $cuenta_id = Cuenta::where('codigo', $request->cuenta_id)->first()->id;
        $balance->cuenta_id = $cuenta_id;
        $balance->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function show(balances $balances)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function edit(balances $balances)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, balances $balances)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function destroy(balances $balances)
    {
        //
    }
}
