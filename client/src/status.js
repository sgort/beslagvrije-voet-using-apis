import React, { Component } from "react";

class Status extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:9000/invorderingen")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <h2>STATUS</h2>
        <p>List of all invorderingen registered:</p>
        <div className="App">
          <p className="App-intro">{this.state.apiResponse}</p>
        </div>
      </div>
    );
  }
}

export default Status;