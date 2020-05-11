import React, { Component } from "react";
import ResidentsList from './components/residentslist';

class Resident extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFetching: false,
      attributes: []
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, isFetching: true });
    fetch('http://localhost:9000/inschrijvingbrp/999999035')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ...this.state,
            isFetching: false,
            attributes: result
          });
        },
        // error handler
        (error) => {
          this.setState({
            ...this.state,
            isFetching: false,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="Home">
        <h1>Registration BRP</h1>
        <p>{this.state.isFetching ? (
          <span>Fetching records</span>
        ) : (
            <span>
              <ResidentsList residents={this.state.attributes} />
            </span>
          )
        }</p>
      </div >
    )
  }
}

export default Resident;