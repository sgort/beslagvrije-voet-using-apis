import React, { Component } from 'react';
import { createSorter } from './components/sort';

class ReadRulesEngine extends Component {
  state = {
    sorters: this.props.sorters
  };

  static defaultProps = {
    sorters: [{
      property: 'date_start',
      direction: 'DESC'
    }]
  };

  componentDidMount() {
    fetch('http://localhost:9000/rulesengine/')
      .then(res => res.json())
      .then(this.onLoad);
  }

  parseData(data) {
    const { sorters } = this.state;

    if (data && data.length) {
      if (Array.isArray(sorters) && sorters.length) {
        data.sort(createSorter(...sorters));
      }
    }

    return data;
  }

  onLoad = data => {
    this.setState({
      data: this.parseData(data.data)
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