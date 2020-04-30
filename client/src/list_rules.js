import React, { Component } from 'react';

class ReadRulesEngine extends Component {
  state = {};

  componentDidMount() {
    fetch('http://localhost:9000/rulesengine/BVV_v1')
      .then(res => res.json())
      .then(this.onLoad);
  }

  parseData(data) {
    return data;
  }

  onLoad = data => {
    this.setState({
      data: this.parseData(data.rules)
    });
  };

  render() {
    const { data } = this.state;

    return data ? this.renderData(data) : this.renderLoading();
  }

  renderData(data) {
    if (data && data.length > 0) {
      return (
        <div>
          <h1>Rules Engine config BVV</h1>
          <p>Reference | Issuer | Date Start | Date End</p>
            <p>{data[0].reference} | {data[0].issuer} | {data[0].date_start} | {data[0].date_end}</p>
          <p>Rules:</p>
          <p>{data[0].rules}</p>
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

export default ReadRulesEngine;