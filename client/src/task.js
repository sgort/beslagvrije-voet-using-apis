import React, { Component } from "react";
 
class Task extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:9000/users")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <h2>TASK</h2>
        <p>Signed up users so far:</p>
        <div className="App">
          <p className="App-intro">{this.state.apiResponse}</p>
        </div>
      </div>
    );
  }
}
 
export default Task;