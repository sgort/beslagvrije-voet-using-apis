import React, { Component } from "react";
var simStep = "default";
localStorage.setItem("simStepLocalStorage", simStep);

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <p>
          <img src={require('./images/discipl-api-strategy.jpg')} alt=""/>
        </p>
      </div>
    )
  }
}

export default Home;