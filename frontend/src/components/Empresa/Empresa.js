import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import { Select,FormControl, MenuItem, InputLabel, Box } from "@material-ui/core";
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import axios from "axios";

class Empresa extends Component{
    constructor(props){
        super(props)
        this.state={
            catalogo: [],
            sectores: [],
            actividades: [],
        }
        this.handleChange = this.handleChange.bind(this);
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
    componentDidMount() {
        axios
          .get("http://127.0.0.1:8000/api/sectores/")
          .then((response) => {
            this.setState({ sectores: response.data });
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title:
                "Por el momento no hay conexión con la base de datos",
            });
          });
      }
    handleChange(event) {
        axios
            .get("http://127.0.0.1:8000/api/actividadesPorSector/",{
                params:{id:event.target.value},
            })
            .then((response)=>{
              this.setState({actividades: response.data});
            })
            .catch((error)=>{})
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
                <Box sx={{minWidth: 120}}>
                <FormControl
                    
                >
                    <InputLabel>Sector:</InputLabel>
                    <Select
                        id="sector_id"
                        onChange={this.handleChange}
                    >
                        {this.state.sectores.map((elemento) =>(
                            <MenuItem
                            key={elemento.id}
                            value={elemento.id}
                            >
                            {elemento.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel>Actividad:</InputLabel>
                    <Select
                        id="actividad_id"
                    >
                        {this.state.actividades.map((elemento2) =>(
                            <MenuItem
                            key={elemento2.id}
                            value={elemento2.id}
                            >
                            {elemento2.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Box>
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