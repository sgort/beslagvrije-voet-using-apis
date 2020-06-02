import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import './app.css';

import Home from './home';
import ListCredentials from "./list_credentials";
import ListInvorderingen from './list_outcome';
import ListMonth from './list_month';
import ListBaseline from "./list_baseline";
import Simulation from "./components/simulation";
import UseCase from "./use-case";


const App = () => (
  <div className='app'>
    <h1>Demo keten derdenbeslag</h1>
    <Navigation />
    <AllRoutes />
  </div>
);

const Navigation = () => (
  <nav>
    <ul className="header">
      <li><NavLink exact to="/">Start</NavLink></li>
      <li><NavLink to="/usecase">Casus</NavLink></li>
      <li><NavLink to="/baseline">Uitgangssituatie</NavLink></li>
      <li><NavLink to="/credentials">Credentials</NavLink></li>
      <li><NavLink to="/outcome">Resultaat</NavLink></li>
      <li><NavLink to="/month">Maandoverzicht</NavLink></li>
      <li><NavLink to="/simulation">Simulatie</NavLink></li>
    </ul>
  </nav>
);

class AllRoutes extends Component {
  render() {
    return (
      <Switch>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/usecase" component={UseCase} />
          <Route path="/baseline" component={ListBaseline} />
          <Route path="/credentials" component={ListCredentials} />
          <Route path="/outcome" component={ListInvorderingen} />
          <Route path="/month" component={ListMonth} />
          <Route path="/simulation" component={Simulation} />
        </div>
      </Switch>
    );
  }
}

export default App;