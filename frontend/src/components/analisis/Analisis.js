import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Opciones from './Opciones';
import TablaAnalisis from './TablaAnalisis';


class Analisis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
    };
  }
  render() {
    return (
      <div>
        <Opciones 
        botonAnalisis={<Button variant="success">Realizar análisis</Button>}
        />
        <TablaAnalisis
        tituloTabla="Analisis Horizontal" 
        periodoInicio ="2019"
        periodoFin = "2020"
        tituloC1 = "V. Absoluta"
        tituloC2 = "V. Relativa"
        boton={<Button variant="secondary" className="float-right">Imprimir</Button>}
        />
        <TablaAnalisis 
        tituloTabla="Analisis Vertical" 
        periodoInicio ="2019"
        periodoFin = "2020"
        tituloC1 = "2019"
        tituloC2 = "2020"
        boton={<Button variant="secondary">Imprimir</Button>}
        />
      </div>
    );
  }
}

export default Analisis;
