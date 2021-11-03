import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Col, Form } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import TablaAnalisis from "./TablaAnalisis";
import "./Analisis.css";
import axios from "axios";

class AnalisisHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      periodos: [],
      periodoInicio: [],
      periodoFin: [],
      rubros: [],
      analisisHorizontal: { /* Si se guardara el analisis */ 
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

  componentDidMount() {
    //informacion de los periodos
    axios
      .get("http://127.0.0.1:8000/api/balances/periodo/", {
        params: {
          empresa: 1 /* Cambiar cuando haya logeo */,
        },
      })
      .then((response) => {
        this.setState({ periodos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    //Informacion de los rubros
    axios
      .get("http://127.0.0.1:8000/api/rubros/")
      .then((response) => {
        this.setState({ rubros: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Metodo para almacenar los datos ingresados por el usuario
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  peticionGet = async () => {
    //Obtener periodo de incio
    axios
      .get("http://127.0.0.1:8000/api/balances/horizontal/", {
        params: {
          empresa: 1 /* Cambiar cuando haya logeo */,
          periodo: this.state.form.periodoInicio,
          rubro: this.state.form.rubro,
        },
      })
      .then((response) => {
        this.setState({ periodoInicio: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    //Obtener periodo de fin
    axios
      .get("http://127.0.0.1:8000/api/balances/horizontal/", {
        params: {
          empresa: 1 /* Cambiar cuando haya logeo */,
          periodo: this.state.form.periodoFin,
          rubro: this.state.form.rubro,
        },
      })
      .then((response) => {
        this.setState({ periodoFin: response.data });
        //Metodo para el calculo del analisis
        this.calculo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Metodo que realiza el calculo del analisis horizontal
  calculo() {
    const cuenta = [];
    for (var i = 0; i < this.state.periodoInicio.length; i++) {
      cuenta[i] = {
        nombre: this.state.periodoInicio[i].nombre,
        saldoInicio: this.state.periodoInicio[i].valor,
        saldoFin: this.state.periodoFin[i].valor,
      };
    }
    this.setState({ cuentas: cuenta });
  }

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
                    <option value="" disabled={true}>Seleccione...</option>
                    {this.state.periodos.map((elemento) => (
                      <option key={elemento.anio} value={elemento.anio}>
                        {elemento.anio}
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
                    <option value="" disabled={true}>Seleccione...</option>
                    {this.state.periodos.map((elemento) => (
                      <option key={elemento.anio} value={elemento.anio}>
                        {elemento.anio}
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
                    <option value="" disabled={true}>Seleccione...</option>
                    {this.state.rubros.map((elemento) => (
                      <option key={elemento.id} value={elemento.id}>
                        {elemento.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </>
          }
          botonAnalisis={
            <Button variant="success" onClick={() => this.peticionGet()}>
              Realizar análisis
            </Button>
          }
          botonImprimir={
            <ReactToPrint
              trigger={() => <Button variant="secondary">Imprimir</Button>}
              content={() => this.componentRef}
              documentTitle={"Analisis Horizontal " + form.periodoInicio+"-"+form.periodoFin}
            />
          }
        />
        <TablaAnalisis
          ref={(el) => (this.componentRef = el)}
          tituloTabla={"Analisis Horizontal  "}
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
              {this.state.periodoInicio.length >= 1 &&
              this.state.periodoFin.length >= 1 ? (
                this.state.cuentas.map((elemento) => (
                  <tr>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.saldoInicio}</td>
                    <td>{elemento.saldoFin}</td>
                    <td>
                      {(elemento.saldoFin - elemento.saldoInicio).toFixed(2)}
                    </td>
                    <td>
                      {(
                        (elemento.saldoFin / elemento.saldoInicio - 1) *
                        100
                      ).toFixed(2) + " %"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay registros</td>
                </tr>
              )}
            </>
          }
        />
      </div>
    );
  }
}

export default AnalisisHorizontal;
