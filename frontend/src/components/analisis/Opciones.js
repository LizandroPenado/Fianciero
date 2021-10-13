import React from "react";
import { Container, Row, Col} from "react-bootstrap";

export default function opciones(props) {
  return (
    <Container className="opciones-analisis pb-2 text-center ">
      <Row className="justify-content-md-center">
        {props.opciones}
        <Col md="auto" className="align-self-end pt-3">
          {props.botonAnalisis}
        </Col>
        <Col md="auto" className="align-self-end pt-3">
          {props.botonImprimir}
        </Col>
      </Row>
    </Container>
  );
}
