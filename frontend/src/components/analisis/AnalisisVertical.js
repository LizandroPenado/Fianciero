import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Col, Form } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import TablaAnalisis from "./TablaAnalisis";

/* Este arreglo crearia para mostrar en la tabla */
const cuentas = [
  { cuenta: "Efectivo", saldo: 9000, total: 1468800 },
  { cuenta: "Cuentar por cobrar", saldo: 351200, total: 1468800 },
];

/* Esto traeria de la BD */
/* const balance2019 = [
  { cuenta: "Efectivo", saldo: 9000, periodo: 2019},
  { cuenta: "Cuentar por cobrar", saldo: 351200, periodo: 2019},
]; */

/* Este arreglo crearia para los periodos */
const periodos = [2019, 2020];

class AnalisisVertical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      periodos: [],
      analisisVertical: {
        cuenta: "",
        saldo: 0.0,
        vertical: "",
      },
      form: {
        periodo: 0,
        estadoFinanciero: "",
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
                    <Form.Label>Estado financiero</Form.Label>
                    <Form.Select
                      id="estadoFinanciero"
                      name="estadoFinanciero"
                      value={form.estadoFinanciero}
                      onChange={this.handleChange}
                    >
                      <option value="">Seleccione...</option>
                      <option key="Balance General" value="Balance General">
                        Balance general
                      </option>
                      <option key="Estado Resultado" value="Estado Resultado">
                        Estado de resultado
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </>
            }
            botonAnalisis={<Button variant="success">Realizar análisis</Button>}
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
            tituloTabla={"Analisis Vertical  " + form.estadoFinanciero}
            columnas={
              <>
                <th>Cuenta</th>
                <th>Periodo {form.periodo}</th>
                <th>{form.periodo}</th>
              </>
            }
            filas={
              <>
                {cuentas.map((elemento) => (
                  <tr>
                    <td>{elemento.cuenta}</td>
                    <td>{elemento.saldo}</td>
                    <td>
                      {((elemento.saldo / elemento.total) * 100).toFixed(2) +
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
