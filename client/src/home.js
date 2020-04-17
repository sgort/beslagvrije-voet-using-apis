import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:9000/inschrijvingbrp/999994669")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }
  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <h2>HOME</h2>
        <p>Natuurlijk Persoon (bron: BRP) concerning:</p>
        <div className="App">
          <p className="App-intro">{this.state.apiResponse}</p>
        </div>
      </div>
    );
  }
}

export default Home;