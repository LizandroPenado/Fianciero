import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Col, Form } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import TablaAnalisis from "./TablaAnalisis";
import "./Analisis.css";

/* Este arreglo crearia para mostrar en la tabla */
const periodoInicio = [
  { nombre: "Caja", rubro: "Activos", periodo: 2018, saldo: 10000 },
  { nombre: "Bancos", rubro: "Activos", periodo: 2018, saldo: 20000 },
  /* { nombre: "Proveedores", rubro: "Pasivos", periodo: 2018, saldo: 20000 },
  { nombre: "Impuestos", rubro: "Pasivos", periodo: 2018, saldo: 15000 }, */
];
const periodoFin = [
  { nombre: "Caja", rubro: "Activos", periodo: 2019, saldo: 12000 },
  { nombre: "Bancos", rubro: "Activos", periodo: 2019, saldo: 15000 },
  /* { nombre: "Proveedores", rubro: "Pasivos", periodo: 2019, saldo: 35000 },
  { nombre: "Impuestos", rubro: "Pasivos", periodo: 2019, saldo: 5000 }, */
];

/* Este arreglo crearia para los periodos */
const periodos = [2019, 2020];

class AnalisisHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      periodos: [],
      analisisHorizontal: {
        cuenta: "",
        saldoInicial: 0.0,
        saldoFinal: 0.0,
        absoluto: 0.0,
        relativo: "",
      },
      form: {
        periodoInicio: "",
        periodoFin: "",
        rubro: "",
      },
    };
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  calculo() {
    //this.peticionGet();
    const cuenta = [];
    for (var i = 0; i < periodoInicio.length; i++) {
      cuenta[i] = {
        nombre: periodoInicio[i].nombre,
        saldoInicio: periodoInicio[i].saldo,
        saldoFin: periodoFin[i].saldo,
      };
    }
    this.setState({ cuentas: cuenta });
    console.log(cuenta);
    console.log(this.state.form.periodoInicio);
    console.log(this.state.form.periodoFin);
    console.log(this.state.form.rubro);
  }

  peticionGet = async () => {
    //Obtener periodo de incio
    /* axios
    .get(url, {
      params: {
        user: nombreUsuario,
        periodo: this.state.form.periodoInicio,
        rubro: this.state.form.rubro,
      },
    })
    .then((response)=>{
      const arregloInicial = response.data;
      const periodo = [];
      for(var i=0; i<arregloInicial.length; i++){
        periodo[i] = {
          nombre: arregloInicial[i].nombre,
          periodo: arregloInicial[i].balance.periodo,
          saldo: arregloInicial[i].balance.saldo,
        };
      }
      this.setState({periodoInicio: periodo})
    }) */
    //Obtener periodo de fin
    /* axios
    .get(url, {
      params: {
        user: nombre_usuario,
        periodo: this.state.form.periodoFin,
        rubro: this.state.form.rubro,
      },
    })
    .then((response)=>{
      const arregloInicial = response.data;
      const periodo = [];
      for(var i=0; i<arregloInicial.length; i++){
        periodo[i] = {
          nombre: arregloInicial[i].nombre,
          periodo: arregloInicial[i].balance.periodo,
          saldo: arregloInicial[i].balance.saldo,
        };
      }
      this.setState({periodoFin: periodo})
    }) */
  };

  render() {
    const { form } = this.state;
    return (
      <div>
        <Opciones
          opciones={
            <>
              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Periodo de inicio</Form.Label>
                  <Form.Select
                    id="periodoInicio"
                    name="periodoInicio"
                    value={form.periodoInicio}
                    onChange={this.handleChange}
                  >
                    <option value="">Seleccione...</option>
                    {/* Cambiar periodo por el estado */}
                    {periodos.map((elemento) => (
                      <option key={elemento} value={elemento}>
                        {elemento}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Periodo de fin</Form.Label>
                  <Form.Select
                    id="periodoFin"
                    name="periodoFin"
                    value={form.periodoFin}
                    onChange={this.handleChange}
                  >
                    <option value="">Seleccione...</option>
                    {/* Cambiar periodo por el estado */}
                    {periodos.map((elemento) => (
                      <option key={elemento} value={elemento}>
                        {elemento}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Rubro</Form.Label>
                  <Form.Select
                    id="rubro"
                    name="rubro"
                    value={form.rubro}
                    onChange={this.handleChange}
                  >
                    <option value="">Seleccione...</option>
                    <option key="activo" value="activo">
                      Activo
                    </option>
                    <option key="pasivo" value="pasivo">
                      Pasivo
                    </option>
                    <option key="patrimonio" value="patrimonio">
                      Patrimonio
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </>
          }
          botonAnalisis={
            <Button variant="success" onClick={() => this.calculo()}>
              Realizar análisis
            </Button>
          }
          botonImprimir={
            <ReactToPrint
              trigger={() => <Button variant="secondary">Imprimir</Button>}
              content={() => this.componentRef}
            />
          }
        />
        <TablaAnalisis
          ref={(el) => (this.componentRef = el)}
          tituloTabla={"Analisis Horizontal  " + form.rubro}
          columnas={
            <>
              <th>Cuenta</th>
              <th>Periodo {form.periodoInicio}</th>
              <th>Periodo {form.periodoFin}</th>
              <th>V. Absoluto</th>
              <th>V. Relativo</th>
            </>
          }
          filas={
            <>
              {this.state.cuentas.map((elemento) => (
                <tr>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.saldoInicio}</td>
                  <td>{elemento.saldoFin}</td>
                  <td>{elemento.saldoFin - elemento.saldoInicio}</td>
                  <td>
                    {(
                      (elemento.saldoFin / elemento.saldoInicio - 1) *
                      100
                    ).toFixed(2) + " %"}
                  </td>
                </tr>
              ))}
            </>
          }
        />
      </div>
    );
  }
}

export default AnalisisHorizontal;
