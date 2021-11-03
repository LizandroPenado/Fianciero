import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Home.css"

class Home extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={8} className="align-self-center" align="center">
            <h2>Bienvenido *Nombre del usuario*</h2>
          </Col>
          <Col sm={4} className="align-self-center">
            <h3 >*Nombre del sistema*</h3>
            <p >
              Sistema informatico, para la implementación de análisis
              financieros.
            </p>
            <p>Ingresa informacion: permite...</p>
            <p>Análisis horizontal: permite...</p>
            <p>Análisis Vertical: permite...</p>
            <p>Graficar cuentas: permite...</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
