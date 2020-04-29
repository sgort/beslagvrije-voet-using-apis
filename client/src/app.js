import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import './app.css';

import Home from "./home";
import ListCredentials from "./list_credentials";
import ListFiltered from './list_invorderingen_filtered';
import List from "./list_invorderingen";
import UserAdmin from "./useradmin";


const App = () => (
  <div className='app'>
    <h1>Demo beslagvrije voet using API's</h1>
    <Navigation />
    <AllRoutes />
  </div>
);

const Navigation = () => (
  <nav>
    <ul className="header">
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink to="/credentials">Credentials</NavLink></li>
      <li><NavLink to="/list-filtered">List Filtered</NavLink></li>
      <li><NavLink to="/list-all">List All</NavLink></li>
      <li><NavLink to="/useradmin">Admin</NavLink></li>
    </ul>
  </nav>
);

class AllRoutes extends Component {
  render() {
    return (
      <Switch>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/credentials" component={ListCredentials} />
          <Route path="/list-filtered" component={ListFiltered} />
          <Route path="/list-all" component={List} />
          <Route path="/useradmin" component={UserAdmin} />
        </div>
      </Switch>
    );
  }
}

export default App;