import React, { Component } from "react";
import { Col, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import axios from "axios";
import Swal from "sweetalert2";
import App from "../../App.css";

class Graficar extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            balance:[],
            label:[],
            valores:[],
            nombreC:'',
            codigo:'',
            peridoI:[],
            cuentasP:[],
            form: {
              periodoInicio: "",
              periodoFin: "",
              cuenta: "",
            },
        }
    }
    componentDidMount(){
      fetch(`http://127.0.0.1:8000/api/cuentaEmpresa/${3}`,
      {
        method:"GET",
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cuentasP:data
        })
        console.log(data)
      })

      fetch(`http://127.0.0.1:8000/api/balances/periodo?empresa=3`
      ,{
        method: "GET",
        //body: JSON.stringify({empresa:3}),
        /*headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }*/
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          peridoI: data
        })
        console.log(this.state.peridoI)
      })
    }

    //Metodo para almacenar datos de usuario
    graficar = () => {
      console.log(this.state.form.periodoInicio)
      const grafi = {
        'idCuenta':this.state.form.cuenta,
        'idEmpresa':3,
        'anioIni':this.state.form.periodoInicio,
        'anioFin':this.state.form.periodoFin
    }
      if(this.state.form.cuenta === "" || this.state.form.periodoInicio === "" || this.state.form.periodoFin === "")
      {
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            "Rellenar los campos solicitados.(Período de Inicio o Fin, Cuenta)",
          showConfirmButton: true,
        });
      }else
      {
        fetch("http://localhost:8000/api/graficar"
      ,{
	      method: "POST",
        body: JSON.stringify(grafi),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data =>{
            this.setState({
                label: data.map(g=>g.anio),
                valores:data.map(g=>g.valor),
                nombreC:data[0].cuenta.nombre,
                codigo:data[0].cuenta.codigo
            })
            console.log(data)
        })
        console.log(grafi)
        /*console.log(this.state.form.periodoInicio,this.state.form.periodoFin,this.state.form.cuenta)*/
    }
      }

    handleChange = async (e) => {
      console.log(e)
      e.persist();
      await this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
    };

    render(){

        let graficoOculto = false;
        if(this.state.nombreC === "" || this.state.valores.length === 0 || this.state.label.length === 0)
        {
          graficoOculto = false;
        }else
        {
          graficoOculto = true;
        }
        return(
        <div>

            <Col md="auto pt-2">
            <Form.Group>
              <Form.Label>
                Perido de Inicio:
              </Form.Label>
            <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione periodo de inicio</Tooltip>}
                  >
              <Form.Select onChange={this.handleChange} name="periodoInicio">
                <option>Seleccione Año</option>
                {
                  this.state.peridoI.map(p =>{
                    return <option key={p.anio} value = {p.anio}>{p.anio}</option>
                })
                }
              </Form.Select>
            </OverlayTrigger>
            </Form.Group>
            </Col>

            <Col md="auto pt-2">
              <Form.Group>
                <Form.Label>
                  Fin de Periodo:
                </Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione periodo de fin</Tooltip>}
                  >
                    <Form.Select onChange={this.handleChange} name="periodoFin">
                      <option>Seleccione Año</option>
                        {
                          this.state.peridoI.map(p =>{
                          return <option key={p.anio} value = {p.anio}>{p.anio}</option>
                        })
                        }
                    </Form.Select>
                  </OverlayTrigger>
              </Form.Group>
            </Col>

            <Col md="auto pt-2">
              <Form.Group>
                <Form.Label>Seleccione Cuenta: </Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione una Cuenta</Tooltip>}
                  > 
                    <Form.Select onChange={this.handleChange} name="cuenta">
                      <option>Seleccione Cuenta</option>
                        {
                          this.state.cuentasP.map(p =>{
                            return <option key={p.id} value = {p.id}>{p.nombre}</option>
                          })
                        }
                    </Form.Select>
                  </OverlayTrigger>
              </Form.Group>
            </Col>

            <Button onClick= {()=>this.graficar()}>Enviar</Button>
            
              
            <Line className = {graficoOculto? "": "graficoOculto"}
                data={{
                    'labels':this.state.label,
                    datasets:[{
                        'label':this.state.nombreC,
                        'data':this.state.valores,
                        'fill':false,
                        'borderColor':'rgb(75,192,192)',
                        'tension':0.1
                    }]}
                }
            />

        </div>)
    }
}

export default Graficar