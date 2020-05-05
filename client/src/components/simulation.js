import React, { Component } from "react";

/**
 * External json files holding the records for simulation
 */
const defaultSimulation = require('./../simulations/simulation-default.json');


function runSimulation(json) {
    // POST simulated invorderingen set in the collection
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    for (var i = 0; i < json.length; i++) {
        var raw = JSON.stringify(json[i]);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/invorderingen/insert", requestOptions)
            .then(response => response.text())
            .catch(error => alert('error', error));
    }
}

function resetSimulation() {
    // DELETE simulated invorderingen set in the collection
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("http://localhost:9000/invorderingen", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

class Simulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "default"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        runSimulation(defaultSimulation);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Select your simulation:
                    <select class="ui selection dropdown" value={this.state.value} onChange={this.handleChange}>
                        <option value="default">Default - no changes</option>
                        <option value="income">Income changes</option>
                        <option value="rules">New Rules Engine</option>
                    </select>
                </label>
                <p></p>
                <input class="ui primary button" type="submit" value="Run it!" />
                <input class="ui button" value="Reset" onClick={() => { resetSimulation() }} />
                <p></p>
            </form>
        );
    }
}

export default Simulation