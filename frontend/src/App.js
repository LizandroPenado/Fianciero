import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Rol from "./components/rol/Rol";
import AnalisisVertical from "./components/analisis/AnalisisVertical";
import AnalisisHorizontal from "./components/analisis/AnalisisHorizontal";
import Typography from "@material-ui/core/Typography";
// import Cuenta from "./components/cuenta/Cuenta";
import Empresa from "./components/Empresa/Empresa"
import Sector from "./components/Sector/Sector";

export default function App() {
  return (
    <main /* className={classes.content} */>
      <Router>
        <Navbar />
        <div className="pt-4"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          {/* <Route path="/cuenta" component={Cuenta} /> */}
          <Route path="/empresa" component={Empresa} />
          {/* <Route path="/informacion" component={Login} /> */}
          <Route path="/sector" component={Sector} /> 
          <Route path="/rol" component={Rol} />
          <Route path="/analisisVertical" component={AnalisisVertical} />
          <Route path="/analisisHorizontal" component={AnalisisHorizontal} />
          {/* <Route path="/graficar" component={cuenta} /> */}
        </Switch>
      </Router>
      <footer className="fixed-bottom">
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          Financieros
          {" " + new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
    </main>
  );
}

