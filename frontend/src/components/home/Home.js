import React, { Component } from "react";
import "./Home.css"

class Home extends Component {
  render() {
    return (
      <>
        <div className="home-container">
          <div className="home-title">
            <h1>Bienvenido</h1>
          </div>
          <div className="home-info">
            <h3>Sistema Financiero - G02</h3>
            <p>
              Este sistema es una <b>implementación</b> de los diferentes informes financieron que una empresa puede efectuar para determinar su progreso anualmente.
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
