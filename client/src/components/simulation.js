import React, { Component } from "react";
import ClockLoader from 'react-spinners/ClockLoader';

/**
 * External json files holding the records for simulation
 */
const defaultSimulation = require('./../simulations/simulation-default.json');
const rulesSimulation = require('./../simulations/simulation-rules-engine.json');

function insertRecords(raw) {
    // POST simulated invorderingen set in the collection
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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

function deleteRecords() {
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

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

function Spinner(props) {
    if (!props.show) {
        return null;
    }

    return (
        <div className="sweet-loading">
            <ClockLoader
                size={150}
                color={"#81e6f3"}
                loading='true'
            />
        </div>
    );
}


class Simulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "default",
            showSpinner: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    runSimulation(type) {
        switch (type) {
            case type = "rules":
                for (var j = 0; j < rulesSimulation.length; j++) {
                    wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(rulesSimulation[j]);
                    insertRecords(json);
                }
                break;
            default:
                for (var i = 0; i < defaultSimulation.length; i++) {
                    wait(100);
                    var json = JSON.stringify(defaultSimulation[i]);
                    insertRecords(json);
                }
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ showSpinner: !this.state.showSpinner }, function () {
            //alert(this.state.value)
            this.runSimulation(this.state.value);
        });
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
                <input class="ui button" type="text" value="Reset" onClick={deleteRecords} />
                <p></p>
                <div>
                    <Spinner show={this.state.showSpinner} />
                </div>
            </form>
        );
    }
}

export default Simulation
