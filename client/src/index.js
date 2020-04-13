import React from "react";
import ReactDOM from "react-dom";

/**
 * Test version for user administration / UI
 */
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import 'fomantic-ui-css/semantic.min.css';
import './index.css';
import { UsersContextProvider } from './context/users-context';

ReactDOM.render(
  <UsersContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UsersContextProvider>,
  document.getElementById('root')
);


/**
 * Original version
 *
import Main from "./main";
import "./index.css";
 
ReactDOM.render(
  <Main/>, 
  document.getElementById("root")
);
 */