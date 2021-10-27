import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import { Label } from "reactstrap";

export default class TablaAnalisis extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container className="pt-4">
        <div className="text-center">
          <Label>{this.props.tituloTabla}</Label>
        </div>
        <div>
          <Table responsive="sm" className="text-center" hover={false}>
            <thead>
              <tr>{this.props.columnas}</tr>
            </thead>
            <tbody>{this.props.filas}</tbody>
          </Table>
        </div>
        <div>{this.props.boton}</div>
      </Container>
    );
  }
}
