import React, { Component } from "react";


class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h2>Pagina met nadere toelichting...</h2>
        <p></p>
        <p>
          <img src={require('./images/discipl-api-strategy.jpg')} alt=""/>
        </p>
      </div>
    )
  }
}

export default Home;