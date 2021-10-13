import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

export default function opciones(props) {
  return (
    <Container className="opciones-analisis pb-2 text-center ">
      <Row className="justify-content-md-center">
        <Col md="auto pt-2">
          <Form.Group>
            <Form.Label>Tipo de análisis</Form.Label>
            <Form.Select id="analisis" name="analisis">
              <option disabled={true} selected={true}>
                Seleccione...
              </option>
              <option>Análisis Horizontal</option>
              <option>Análisis Vertical</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="auto pt-2">
          <Form.Group>
            <Form.Label>Periodo de inicio</Form.Label>
            <Form.Select id="periodoInicio" name="periodoInicio">
              <option disabled={true} selected={true}>
                Seleccione...
              </option>
              <option>2019</option>
              {/* Aqui debe recibir los años que ingreso */}
              <option>2020</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="auto pt-2">
          <Form.Group>
            <Form.Label>Periodo de fin</Form.Label>
            <Form.Select id="periodoFin" name="periodoFin">
              <option disabled={true} selected={true}>
                Seleccione...
              </option>
              <option>2019</option>
              {/* Aqui debe recibir los años que ingreso */}
              <option>2020</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="auto pt-2">
          <Form.Group>
            <Form.Label>Estado financiero</Form.Label>
            <Form.Select id="estadoFinanciero" name="estadoFinanciero">
              <option disabled={true} selected={true}>
                Seleccione...
              </option>
              <option>Balance general</option>
              <option>Estado de resultado</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="auto" className="align-self-end pt-3">
          {props.botonAnalisis}
        </Col>
      </Row>
    </Container>
  );
}
