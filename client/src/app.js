// src/App.js

import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import UsersListPage from './pages/users-list-page';
import UsersFormPage from './pages/users-form-page';

const App = () => {
  return (
    <Container>
      <div className="ui two item menu">
        <NavLink className="item" activeClassName="active" exact to="/">
          Users List
        </NavLink>
        <NavLink
          className="item"
          activeClassName="active"
          exact
          to="/users/new"
        >
          Add New User
        </NavLink>
      </div>
      <Route exact path="/" component={UsersListPage} />
      <Route path="/users/new" component={UsersFormPage} />
      <Route path="/users/edit/:_id" component={UsersFormPage} />
    </Container>
  );
};

export default App;