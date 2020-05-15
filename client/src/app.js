import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import './app.css';

import Home from './home';
import ListCredentials from "./list_credentials";
import ListInvorderingen from './list_outcome';
import ListBaseline from "./list_baseline";
import Simulation from "./components/simulation";
import UseCase from "./use-case";


const App = () => (
  <div className='app'>
    <h1>Demo API strategy - Collection Limit</h1>
    <Navigation />
    <AllRoutes />
  </div>
);

const Navigation = () => (
  <nav>
    <ul className="header">
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink to="/usecase">Use Case</NavLink></li>
      <li><NavLink to="/baseline">Baseline</NavLink></li>
      <li><NavLink to="/credentials">Credentials</NavLink></li>
      <li><NavLink to="/outcome">Outcome</NavLink></li>
      <li><NavLink to="/simulation">Simulation</NavLink></li>
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
          <Route path="/simulation" component={Simulation} />
        </div>
      </Switch>
    );
  }
}

export default App;