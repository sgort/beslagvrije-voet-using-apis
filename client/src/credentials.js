import React, { Component } from 'react';

class Credentials extends Component {
  state = {};

  componentDidMount() {
    fetch('http://localhost:9000/credentials')
      .then(res => res.json())
      .then(this.onLoad);
  }

  parseData(data) {
    return data;
  }

  onLoad = data => {
    this.setState({
      data: this.parseData(data.credentials)
    });
  };

  render() {
    const { data } = this.state;

    return data ? this.renderData(data) : this.renderLoading();
  }

  renderData(data) {
    if (data && data.length > 0) {
      return (
        <div className="Status">
          <p className="Status credentials">Obtained credential(s): </p>
          <p>BSN | type | value | issuer</p>
          {data.map(item => (
            <div key={item.id}>
              <p>{item.BSN} | {item.type} | {item.value} | {item.issuer}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No items found</div>;
    }
  }

  renderLoading() {
    return <div>Fetching records...</div>;
  }
}

export default Credentials;