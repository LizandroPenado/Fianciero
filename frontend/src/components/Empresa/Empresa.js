import React, { Component} from "react";
import { Form, Col, Container, ButtonGroup} from "react-bootstrap";
import {styled} from '@mui/material/styles'
import DataTable from "../datatable/DataTable";
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import axios from "axios";
import { Select, Button, InputLabel, MenuItem } from "@material-ui/core";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Input = styled('input')({
    display: 'none',
});
const pasos = [
    {
        label: "Inserte la información de su empresa",
        descripcion: "Descripcion del paso",
    },
    {
        label: "Suba su archivo de catálogo de cuentas",
        descripcion: "",
    },
];
class Empresa extends Component{
    constructor(props){
        super(props)
        this.state={
            catalogo: [],
            sectores: [],
            actividades: [],
            empresa: {
                nombre: "",
                descripcion:"",
                actividad_id:"",
                sector_id:""
            },
            ultima_empresa_id:"",
        }
    }
    obtenerUltimaEmpresa(){
        axios  
            .get("http://127.0.0.1:8000/api/ultimaEmpresa")
            .then((response)=>{
                this.setState({ultima_empresa_id: response.data.id.toString()})
            })
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
            const arreglo_inicial = d
            const cuenta = []
            for(var i=0; i<arreglo_inicial.length; i++){
                cuenta[i] = {
                    codigo: arreglo_inicial[i].Codigo,
                    nombre: arreglo_inicial[i].Nombre,
                    rubro: arreglo_inicial[i].Rubro,
                    rubro_id: arreglo_inicial[i].Rubro === "Activos" ? 1 : 
                                arreglo_inicial[i].Rubro === "Costos" ? 2 : 
                                arreglo_inicial[i].Rubro === "Gastos" ? 3 : 
                                arreglo_inicial[i].Rubro === "Ingresos" ? 4 :
                                arreglo_inicial[i].Rubro === "Pasivos" ? 5 : 
                                6,
                    tipoDeCuenta: arreglo_inicial[i].TipoDeCuenta,
                    tipo_id: arreglo_inicial[i].TipoDeCuenta === "Activo Circulante" ? 1:
                                arreglo_inicial[i].TipoDeCuenta === "Activo Fijo" ? 2:
                                3,
                    empresa_id: this.state.ultima_empresa_id,                   
                }
            }
            
            this.setState({catalogo: cuenta})
            console.log(this.state.catalogo)
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
    handleChange = async (e) => {
        e.persist();
        await  this.setState({
            empresa: {
                ...this.state.empresa,
                [e.target.name]:e.target.value,
            }
        })
        axios
        .get("http://127.0.0.1:8000/api/actividadesPorSector/",{
            params:{id:e.target.value},
        })
        .then((response)=>{
          this.setState({actividades: response.data});
        })
        .catch((error)=>{})
    
    }

    guardarDatos = async () =>{
        console.log(this.state.empresa)
        await axios
                .post("http://127.0.0.1:8000/api/empresas",{
                    nombre: this.state.empresa.nombre,
                    descripcion: this.state.empresa.descripcion,
                    actividad_id: this.state.empresa.actividad_id,
                })
                .then((response) =>{
                    Swal.fire({
                        position: "center",
                        icon:"success",
                        title:"Los datos de la empresa se han guardado con éxito",
                        showConfirmButton: true,
                    })
                this.obtenerUltimaEmpresa()
                })
                .catch((error)=>{
                    Swal.fire({
                        position: "center",
                        icon:"error",
                        title:"Hubo un error en el proceso",
                        showConfirmButton: true,
                    })
                })
    }
    guardarCatalogo = async () =>{
            console.log(this.state.catalogo.length)
            const arreglo_inicial = this.state.catalogo;
            const cuenta = []
            var contador = 0
            for(var i=0;i<arreglo_inicial.length; i++){
                cuenta[i] = {
                    codigo: arreglo_inicial[i].codigo,
                    nombre: arreglo_inicial[i].nombre,
                    rubro_id: arreglo_inicial[i].rubro_id,
                    tipo_id: arreglo_inicial[i].tipo_id,
                    empresa_id: arreglo_inicial[i].empresa_id,  
                }
                axios
                    .post("http://localhost:8000/api/cuentas",{
                        codigo: cuenta[i].codigo,
                        nombre: cuenta[i].nombre,
                        rubro_id: cuenta[i].rubro_id,
                        tipo_id: cuenta[i].tipo_id,
                        empresa_id: cuenta[i].empresa_id,
                    }).then((response) =>{
                    })
                    contador++   
                        
            }
            Swal.fire({
                position: "center",
                icon:"success",
                title:"Los datos de " + contador + " cuentas se han guardado con éxito",
                showConfirmButton: true,
            })
    }  
    render(){
        const columns = [
            {
                name: "codigo",
                label: "Código"
            },
            {
                name: "nombre",
                label: "Nombre"
            },
            {
                name: "tipo_id",
                label: "Tipo de Cuenta ID"
            },
            {
                name: "tipoDeCuenta",
                label: "Tipo de Cuenta"
            },
            {
                name: "rubro_id",
                label: "Rubro ID"
            },
            {
                name: "rubro",
                label: "Rubro"
            }

        ]
        return(
            <>
            <Container className="pt-5">
              <Form>
                        <Form.Group as={Col} >
                            <Form.Label>
                                Nombre de la empresa:
                            </Form.Label>
                            <Form.Control
                                id="nombre"
                                name="nombre"
                                value={this.state.empresa.nombre}
                                type="text"
                                placeholder=""
                                maxLength="50"
                                required={true}
                                onChange={this.handleChange}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} className="pr-5">
                            <Form.Label>
                                Descripción de la empresa:
                            </Form.Label>
                            <Form.Control
                                id="descripcion"
                                name="descripcion"
                                value={this.state.empresa.descripcion}
                                type="text"
                                placeholder=""
                                maxLength="50"
                                required={true}
                                onChange={this.handleChange}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <InputLabel id="sector_label">Sector</InputLabel>
                            <Select
                                labelId="sector_label"
                                id="sector_id"
                                name="sector_id"
                                value={this.state.empresa.sector_id}
                                onChange={this.handleChange}
                                label="Sector"
                                >
                                <MenuItem value="" disabled={true}>
                                     Seleccione..
                                </MenuItem> 
                                {this.state.sectores.map((elemento) =>(
                                    <MenuItem
                                        key={elemento.id}
                                        value={elemento.id}
                                    >
                                        {elemento.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Form.Group>
                        <Form.Group>
                        <InputLabel id="actividad_label">Actividad</InputLabel>
                            <Select
                                labelId="actividad_label"
                                id="actividad_id"
                                name="actividad_id"
                                value={this.state.empresa.actividad_id}
                                onChange={this.handleChange}
                                label="Actividad"
                            >
                                <MenuItem value="" disabled={true}>
                                     Seleccione..
                                </MenuItem> 
                                {this.state.actividades.map((elemento2) =>(
                                    <MenuItem
                                    key={elemento2.id}
                                    value={elemento2.id}
                                    >
                                    {elemento2.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Form.Group>
                        <Form.Group>
                            <ButtonGroup onClick={this.guardarDatos}>
                                <Button variant="contained" >Guardar Empresa</Button>
                            </ButtonGroup>
                        </Form.Group>
                        </Form>
                        {/* Formularo para el catalgo de cuentas*/}
                        {this.state.ultima_empresa_id != "" ?  
                            <Form>
                                <Form.Group>
                                <Form.Label>
                                    Suba su catálogo de cuentas:  
                                </Form.Label>
                                <label htmlfor="archivo_input">
                                      
                                    <Input 
                                    id="archivo_input"
                                    accept="xlsx" 
                                    type="file" 
                                    onChange={
                                        (e)=>{
                                            const file = e.target.files[0];
                                            this.leerExcel(file)
                                        }
                                    }
                                    />
                                    <Button component="span" variant="contained" startIcon={<FileUploadIcon />}>
                                        Subir
                                    </Button>
                                </label>
                                
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Datos desde Excel:
                                </Form.Label>
                                {this.state.catalogo != 0 ? <DataTable titulo="Catalogo de cuentas"noRegistro="No se ha cargado ningun registro..."columnas={columns}datos={this.state.catalogo}/> : "" }
                            </Form.Group>
                            <Form.Group>
                                <ButtonGroup onClick={this.guardarCatalogo}>
                                    <Button variant="contained" >Guardar Catálogo</Button>
                                </ButtonGroup>
                            </Form.Group>
                    </Form>
                        
                        : "" }
                        
            </Container> 
            </>
        );
    }
}
export default Empresa;