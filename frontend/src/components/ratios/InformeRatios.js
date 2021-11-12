import React, {Component} from "react";
import { Col, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import TablaAnalisis from "./TablaAnalisis";
import axios from "axios";
import Swal from "sweetalert2";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

class InformeRatios extends Component {
    constructor(props) {
      super(props);
      this.state = {
        periodos: [],
        periodoInicio: [],
        periodoFin: [],
        sectores: [],
        razonesFinancieras:[],
        tipoInforme: [],
        valorInicio: 0,
        valorFin: 0,
        sector: "",
        cantidadFilas: 0,
        diagnosticos: [],
        diagnostico: "",
        comparaciones: [],
        comparacion: "",
        form: {
            razonFinanciera: "",
            tipoInforme: "",
            periodoInicio: "",
            periodoFin: ""
        }
      };
    }
  
    componentDidMount() {

        //informacion de los periodos
        axios
         .get("http://127.0.0.1:8000/api/ratiosEmpresa/periodo/", {
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

        //Informacion de las razones
        axios
        .get("http://127.0.0.1:8000/api/razonesFinancieras/")
        .then((response) => {
          this.setState({razonesFinancieras: response.data});
        })
        .catch((error) => {
          console.log(error);
        });
    }

    peticionGet(){
      axios
      .get("http://127.0.0.1:8000/api/ratiosEmpresa/informe/", {
        params: {
            empresa: 1,
            razonFinanciera: this.state.form.razonFinanciera,
            periodo: this.state.form.periodoInicio,
        }
      })
      .then((response) => {
          console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

      axios
      .get("http://127.0.0.1:8000/api/ratiosEmpresa/informe/", {
        params: {
          empresa: 1,
          razonFinanciera: this.state.form.razonFinanciera,
          periodo: this.state.form.periodoFin,
        }
      })
      .then((response) => {
          console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
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
      console.log(this.state.form.razonFinanciera);
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
                  <Form.Label>Razón Financiera</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione razón financiera</Tooltip>}
                  >
                    <Form.Select
                      id="razonFinanciera"
                      name="razonFinanciera"
                      value={form.razonFinanciera}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true}>
                        Seleccione...
                      </option>
                      {this.state.razonesFinancieras.map((elemento) => (
                        <option key={elemento.id} value={elemento.id}>
                          {elemento.nombre}
                        </option>
                      ))}

                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>

              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Tipo de Informe</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione un tipo de informe</Tooltip>}
                  >
                    <Form.Select
                      id="tipoInforme"
                      name="tipoInforme"
                      value={form.tipoInforme}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true} selected={true}>
                        Seleccione...
                      </option>
                      <option value="comparacion">
                        Comparación Sector
                      </option>
                      <option value="promedio">
                        Promedio Empresa
                      </option>
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>

              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Periodo de inicio</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione periodo de inicio</Tooltip>}
                  >
                    <Form.Select
                      id="periodoInicio"
                      name="periodoInicio"
                      value={form.periodoInicio}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true}>
                        Seleccione...
                      </option>
                      {this.state.periodos.map((elemento) => (
                        <option key={elemento.anio_referencia} value={elemento.anio_referencia}>
                          {elemento.anio_referencia}
                        </option>
                      ))}

                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>

              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Periodo de fin</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione periodo de fin</Tooltip>}
                  >
                    <Form.Select
                      id="periodoFin"
                      name="periodoFin"
                      value={form.periodoFin}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true} selected={true}>
                        Seleccione...
                      </option>
                      {this.state.periodos.map((elemento) => (
                        <option key={elemento.anio_referencia} value={elemento.anio_referencia}>
                          {elemento.anio_referencia}
                        </option>
                      ))}
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>

            </>
          }
          botonAnalisis={
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Si no aparece ninguna opción de selección, no hay conexion a
                  la base de datos
                </Tooltip>
              }
            >
              <Button variant="secondary" onClick={() => this.peticionGet()}>
                Cargar Informe
              </Button>
            </OverlayTrigger>
          }
          botonPdf={
            <>
              <ReactToPrint
                trigger={() => (
                  <Button variant="danger">
                    <PictureAsPdfIcon />
                  </Button>
                )}
                //content={() => this.componentRef}
                documentTitle={
                  "Informe Ratios "
                }
              />
            </>
          }
          botonExcel={
            <ReactHTMLTableToExcel
              id="botonExcel"
              className="btn btn-success"
              table="analisis"
              filename={
                "Informe Ratios " 
              }
              sheet="Informe_Ratios"
              buttonText="EXCEL"
            />
          }
        />
        <TablaAnalisis
          //ref={(el) => (this.componentRef = el)}
          tituloTabla={"Informe Ratios"}
          columnas={
            <>
              <th>#</th>
              <th className="no-ver">id</th>
              <th>R. Financiera</th>
              <th>Nom. Ratio</th>
              <th id="vInicial"></th>
              <th id="vFinal"></th>
              <th id="tipoInfo"></th>
              <th>Diagnóstico</th>
            </>
          }
          filas={
            <>
              
                <tr>
                  <td colSpan="5">No hay registros</td>
                </tr>
            </>
          }
        />
      </div>
      );
    }
  }
  
  export {InformeRatios};