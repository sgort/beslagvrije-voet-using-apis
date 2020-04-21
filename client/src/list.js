import React, { Component } from "react";

class List extends Component {
    state = {}
  
    componentDidMount () {
      fetch('http://localhost:9000/invorderingen')
        .then(res => res.json())
        .then(this.onLoad);
    }
  
    parseData (response) {
      return response.data;
    }
  
    onLoad = (data) => {
      this.setState({
        data: this.parseData(data)
      });
    }
  
    render () {
      const { data } = this.state;
  
      return data ?
        this.renderData(data) :
        this.renderLoading()
    }
  
    renderData (data) {
      if (data && data.length) {
        return (
          <div>
            {
              data.map(item => (
                <div key={item.id}>
                  <a href={item.beslaglegger}>{item.beslag_object}</a> {item.invordering}
                </div>
              ))
            }
          </div>
        );
      } else {
        return <div>No items found</div>
      }
    }
  
    renderLoading () {
      return <div>Loading...</div>
    }
  }

  export default List;