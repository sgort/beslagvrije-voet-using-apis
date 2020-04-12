import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./home";
import Status from "./status";
import Task from "./task";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Demo beslagvrije voet using API's</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/status">Status</NavLink></li>
            <li><NavLink to="/task">Task</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/status" component={Status} />
            <Route path="/task" component={Task} />          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;