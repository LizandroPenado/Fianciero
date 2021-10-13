import React from "react";
import { Container, Table } from "react-bootstrap";
import { Label } from "reactstrap";

export default function opciones(props) {
  return (
    <Container className="pt-4">
      <div className="text-center">
        <Label>{props.tituloTabla}</Label>
      </div>
      <div>
        <Table responsive="sm" className="text-center">
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>Periodo {props.periodoInicio}</th>
              <th>Periodo {props.periodoFin}</th>
              <th>{props.tituloC1}</th>
              <th>{props.tituloC2}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Caja</td>
              <td>10000</td>
              <td>12000</td> {/* Enviar datos de la BD y calculo */}
              <td>2000</td>
              <td>20 %</td>
            </tr>
            <tr>
              <td>Bancos</td>
              <td>20000</td>
              <td>15000</td>
              <td>-5000</td>
              <td>-25 %</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>{props.boton}</div>
    </Container>
  );
}
