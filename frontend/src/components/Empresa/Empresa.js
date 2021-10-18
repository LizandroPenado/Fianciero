import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import * as XLSX from 'xlsx';

class Empresa extends Component{
    constructor(props){
        super(props)
        this.state={
            catalogo: [],
        }
    }
    leerExcel = (archivo) =>{
        const promesa = new Promise((resolve,reject)=>{
            const lector = new FileReader()
            lector.readAsArrayBuffer(archivo)
            lector.onload = (e) =>{
                const bufferArray = e.target.result
                const libro = XLSX.read(bufferArray, {type: "buffer"})
                const nombreHoja = libro.SheetNames[0]
                const hoja = libro.Sheets[nombreHoja]
                const data = XLSX.utils.sheet_to_json(hoja);
                resolve(data)
            }
        })
        promesa.then((d)=>{
            console.log(d)
            this.setState({catalogo: d})
        })
    }
    render(){
        const columns = [
            {
                name: "ID",
                label: "ID"
            },
            {
                name: "Nombre",
                label: "Nombre"
            },
            {
                name: "Saldo",
                label: "Saldo"
            }

        ]
        return(
            <>
                Aqui va la info de la empresa
                <input type="file"
                    onChange={(e)=>{
                        const file = e.target.files[0];
                        this.leerExcel(file)
                    }}
                />
                <DataTable
                titulo="Catalogo desde Excel"
                noRegistro="No hay registro de empleados"
                columnas={columns}
                datos={this.state.catalogo}
                />
            </>
        );
    }
}
export default Empresa;