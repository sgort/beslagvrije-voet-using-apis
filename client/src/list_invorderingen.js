import React, { Component } from 'react';

class List extends Component {
  state = {};

  componentDidMount() {
    fetch('http://localhost:9000/invorderingen')
      .then(res => res.json())
      .then(this.onLoad);
  }

  parseData(data) {
    return data;
  }

  onLoad = data => {
    this.setState({
      data: this.parseData(data.invorderingen)
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
        <p className="Status invorderingen">Status invordering(en): </p>
        <p>BSN | beslaglegger | beslag oject | beslagvrije voet | openstaande vordering | invordering</p>
          {data.map(item => (
            <div key={item.id}>
              <p>{item.BSN} | {item.beslaglegger} | {item.beslag_object} | {item.beslagvrije_voet} | {item.openstaande_vordering} | {item.invordering}</p>
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

export default List;