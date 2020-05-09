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
        <p className="Home attributes">(bron: BRP)</p>
        <p>{this.state.isFetching ? (
          <span>Fetching records</span>
        ) : (
            <span>
              {
                Object.keys(this.state.attributes).map((key, i) => (
                  <p key={i}>
                    <span>{key} : </span>
                    <span>{this.state.attributes[key]}</span>

                  </p>
                ))
              }
            </span>
          )
        }</p>
        <ResidentsList residents={this.state.attributes}/>
      </div >
    )
  }
}

export default Resident;