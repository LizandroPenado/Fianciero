import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Col, Form } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import TablaAnalisis from "./TablaAnalisis";

/* Este arreglo crearia para mostrar en la tabla */
const cuentas = [
  { cuenta: "Caja", saldoInicial: 10000, saldoFinal: 12000 },
  { cuenta: "Bancos", saldoInicial: 20000, saldoFinal: 15000 },
];

/* Esto traeria de la BD */
/* const balance2019 = [
  { cuenta: "Caja", saldo: 10000, periodo: 2019},
  { cuenta: "Bancos", saldo: 20000, periodo: 2019},
];
const balance2020 = [
  { cuenta: "Caja", saldo: 12000, periodo: 2020 },
  { cuenta: "Bancos", saldo: 15000, periodo: 2020 },
]; */

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
        periodoInicio: 0,
        periodoFin: 0,
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
        <TablaAnalisis
          ref={(el) => (this.componentRef = el)}
          tituloTabla={"Analisis Horizontal  " + form.estadoFinanciero}
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
              {cuentas.map((elemento) => (
                <tr>
                  <td>{elemento.cuenta}</td>
                  <td>{elemento.saldoInicial}</td>
                  <td>{elemento.saldoFinal}</td>
                  <td>{elemento.saldoFinal - elemento.saldoInicial}</td>
                  <td>
                    {(elemento.saldoFinal / elemento.saldoInicial - 1).toFixed(
                      2
                    ) + " %"}
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
