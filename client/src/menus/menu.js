import React, { Component } from "react";
import "./menu.css";
 
class Menu extends Component {
  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
 
    return (
      <div id="flyoutMenu"
           onMouseDown={this.props.handleMouseDown} 
           className={visibility}>
        <h2><a href="#">Home</a></h2>
        <h2><a href="#">Users</a></h2>
        <h2><a href="#">Explore</a></h2>
      </div>
    );
  }
}
 
export default Menu;