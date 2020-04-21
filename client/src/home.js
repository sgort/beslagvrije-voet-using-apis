import React, { Component } from "react";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      attributes: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:9000/inschrijvingbrp/999994669')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            attributes: result
          });
        },
        // error handler
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    return (
      <div className="Home">
        <p className="Home attributes">(bron: BRP)</p>
        {
          Object.keys(this.state.attributes).map((key, i) => (
            <p key={i}>
              <span>{key} : </span>
              <span>{this.state.attributes[key]}</span>
            </p>
          ))
        }
      </div>
    )
  }
}

export default Home;