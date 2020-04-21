import React, { Component } from "react";

class Status extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      attributes: []
    }
  }
      /*
      {
        "count": 2,
        "invorderingen":[    {      
        "BSN": 999994669,      
        "samenloop": false,      
        "beslaglegger": 
        "De ambtenaar van de gemeente Valkenswaard",      
        "beslagvrije_voet": 975.1,      
        "request": {        
          "type": "GET_SPECIFIC_INVORDERING",        
          "url": "http://localhost:3000/invorderingen/5e9ad01c675afc4ca4576b7b"      
        }    
      },    
      {      
        "BSN": 999994669,      
        "samenloop": false,      
        "beslaglegger": "De ambtenaar van het Waterschap Groot Salland",      
        "beslagvrije_voet": 960,      
        "request": {        
          "type": "GET_SPECIFIC_INVORDERING",        
          "url": "http://localhost:3000/invorderingen/5e9ad05a675afc4ca4576b7c"      
        }    
      }  
    ]
  }
}
}
*/

  componentDidMount() {
    fetch('http://localhost:9000/invorderingen')
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
      <div className="Status">
        <p className="Status invorderingen">Status invordering(en)</p>
        <div>Number of records: {this.state.attributes.count}
        {this.state.attributes.invorderingen.map((admin, index) => (
          <p key={index}>Record {index}: {admin.beslaglegger}</p>
        ))}
        </div>
      </div>
    )
  }
}

export default Status;