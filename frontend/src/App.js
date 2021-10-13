import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Cuenta from "./components/cuenta/Cuenta";
import Analisis from "./components/analisis/Analisis";

function App() {
  return (
    <main /* className={classes.content} */>
      <Router>
        <Navbar />
        <div className="pt-4"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/cuenta" component={Cuenta} />
          <Route path="/analisis" component={Analisis} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
