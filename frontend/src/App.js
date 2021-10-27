import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Cuenta from "./components/cuenta/Cuenta";
import Empresa from "./components/empresa/Empresa"

export default function App() {
  return (
    <main /* className={classes.content} */>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/cuenta" component={Cuenta} />
          <Route path="/empresa" component={Empresa} />
        </Switch>
      </Router>
    </main>
  );
}

