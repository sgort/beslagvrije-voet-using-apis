import React, { Component } from 'react';
import { NavLink, Route, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import UsersListPage from './pages/users-list-page';
import { UsersContextProvider } from './context/users-context';
import RulesListPage from './pages/rules-list-page';
import Resident from './resident';


class UseCase extends Component {
    render() {
        return (
            <UsersContextProvider>
                <Router>
                    <Container>
                        <div className="ui three item menu">
                            <NavLink className="item" activeClassName="active" exact to="/">
                                Subject
                    </NavLink>
                            <NavLink
                                className="item"
                                activeClassName="active"
                                exact
                                to="/context"
                            >
                                Context
                    </NavLink>
                            <NavLink
                                className="item"
                                activeClassName="active"
                                exact
                                to="/rules"
                            >
                                Rules Engine
                    </NavLink>
                        </div>
                        <Route exact path="/" component={Resident} />
                        <Route path="/context" component={UsersListPage} />
                        <Route path="/rules" component={RulesListPage} />
                    </Container>
                </Router>
            </UsersContextProvider>
        );
    }
};

export default UseCase;