import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Col, Form } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import TablaAnalisis from "./TablaAnalisis";
import "./Analisis.css";

/* Este arreglo crearia para mostrar en la tabla */
const cuentasPeriodo = [
  { nombre: "Caja", tipoCuenta: "Activo circulante", rubro: "Activos", periodo: 2018, saldo: 10000 },
  { nombre: "Bancos", tipoCuenta: "Activo circulante", rubro: "Activos", periodo: 2018, saldo: 20000 },
  { nombre: "Inversiones", tipoCuenta: "Activo circulante", rubro: "Activos", periodo: 2018, saldo: 40000 },
  { nombre: "Clientes", tipoCuenta: "Activo circulante", rubro: "Activos", periodo: 2018, saldo: 20000 },
  { nombre: "Inventarios", tipoCuenta: "Activo circulante", rubro: "Activos", periodo: 2018, saldo: 40000 },
  { nombre: "Activos fijos", tipoCuenta: "Activo circulante", rubro: "Activos", periodo: 2018, saldo: 60000 },
  { nombre: "Diferidos", tipoCuenta: "Activo circulante", rubro: "Activos", periodo: 2018, saldo: 10000 },
];

/* Este arreglo crearia para los periodos */
const periodos = [2019, 2020];

class AnalisisVertical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      periodos: [],
      totalRubro: 0,
      analisisVertical: {
        cuenta: "",
        saldo: 0.0,
        vertical: "",
      },
      form: {
        periodo: "",
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
    var total = 0;
    for (var i = 0; i < cuentasPeriodo.length; i++) {
      cuenta[i] = {
        nombre: cuentasPeriodo[i].nombre,
        tipoCuenta: cuentasPeriodo[i].tipoCuenta,
        saldo: cuentasPeriodo[i].saldo,
      };
      total += cuentasPeriodo[i].saldo;
    }
    this.setState({ cuentas: cuenta, totalRubro: total });
    console.log(cuenta);
    console.log(this.state.form.periodo);
    console.log(this.state.form.rubro);
    console.log(total);
    console.log(this.state.totalRubro);
  }

  peticionGet = async () => {
    /* axios
    .get(url, {
      params: {
        user: nombreUsuario,
        periodo: this.state.form.periodo,
        rubro: this.state.form.rubro,
      },
    })
    .then((response)=>{
      const arregloInicial = response.data;
      const cuenta = [];
      for(var i=0; i<arregloInicial.length; i++){
        cuenta[i] = {
          nombre: arregloInicial[i].nombre,
          periodo: arregloInicial[i].balance.balance,
          saldo: arregloInicial[i].balance.saldo,
        };
      }
      this.setState({cuentas: cuenta})
    }) */
  };

  render() {
    const { form } = this.state;
    return (
      <>
        <div>
          <Opciones
            opciones={
              <>
                <Col md="auto pt-2">
                  <Form.Group>
                    <Form.Label>Periodo</Form.Label>
                    <Form.Select
                      id="periodo"
                      name="periodo"
                      value={form.periodo}
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
            botonAnalisis={<Button variant="success" onClick={() => this.calculo()}>Realizar análisis</Button>}
            botonImprimir={
              <ReactToPrint
                trigger={() => <Button variant="secondary">Imprimir</Button>}
                content={() => this.componentRef}
              />
            }
          />
        </div>
        <div id="tabla">
          <TablaAnalisis
            ref={(el) => (this.componentRef = el)}
            tituloTabla={"Analisis Vertical  " + form.rubro}
            columnas={
              <>
                <th>Cuenta</th>
                <th>Periodo {form.periodo}</th>
                <th>Analísis vetical</th>
              </>
            }
            filas={
              <>
                {this.state.cuentas.map((elemento) => (
                  <tr>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.saldo}</td>
                    <td>
                      {((elemento.saldo / this.state.totalRubro) * 100).toFixed(2) +
                        " %"}
                    </td>
                  </tr>
                ))}
              </>
            }
          />
        </div>
      </>
    );
  }
}

export default AnalisisVertical;
