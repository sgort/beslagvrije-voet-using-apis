import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import MenuContainer from "./menus/menucontainer";

/**
 * Test version for user administration / UI
 *
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import 'fomantic-ui-css/semantic.min.css';
import { UsersContextProvider } from './context/users-context';

ReactDOM.render(
  <UsersContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UsersContextProvider>,
  document.getElementById('root')
);
*/

/**
 * Test version for Single Page App (SPA)
 *
import Main from "./main";
 
ReactDOM.render(
  <Main/>, 
  document.getElementById("root")
);
*/

/**
 * Test version for slidingmenu
 */
ReactDOM.render(
  <MenuContainer/>,
  document.querySelector("#container")
);
