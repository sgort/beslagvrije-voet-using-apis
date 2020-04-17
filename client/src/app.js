import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import './app.css';

import Home from "./home";
import Status from "./status";
import Users from "./users";
import UserAdmin from "./useradmin"

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
      <li><NavLink to="/status">Status</NavLink></li>
      <li><NavLink to="/users">Users</NavLink></li>
      <li><NavLink to="/useradmin">Admin</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <div className="content">
      <Route exact path="/" component={Home} />
      <Route path="/status" component={Status} />
      <Route path="/users" component={Users} />
      <Route path="/useradmin" component={UserAdmin} />
    </div>
  </Switch>
);

export default App;