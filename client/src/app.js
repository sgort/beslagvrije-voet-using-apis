import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import './app.css';

import Home from "./home";
import List from "./list_invorderingen";
import Status from "./status";
import UserAdmin from "./useradmin";

const App = () => (
  <div className='app'>
    <h1>Demo beslagvrije voet using API's</h1>
    <Navigation />
    <Main />
  </div>
);

const Navigation = () => (
  <nav>
    <ul className="header">
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink to="/list">List All</NavLink></li>
      <li><NavLink to="/useradmin">Admin</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <div className="content">
      <Route exact path="/" component={Home} />
      <Route path="/list" component={List} />
      <Route path="/useradmin" component={UserAdmin} />
    </div>
  </Switch>
);

export default App;