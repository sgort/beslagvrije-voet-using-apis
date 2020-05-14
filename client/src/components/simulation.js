import React, { Component } from "react";
import ClockLoader from 'react-spinners/ClockLoader';

/**
 * External json files holding the records for simulation
 */
const intialBaselineInvorderingen = require('./../simulations/simulation-baseline-invorderingen.json');
const intialBaselineCredentials = require('./../simulations/simulation-baseline-credentials.json');
const nochangeSimulation = require('./../simulations/simulation-default.json');
const rulesSimulation = require('./../simulations/simulation-rules-engine.json');
const credentialsSimulation = [
    {
        "BSN": "999994669",
        "type": "Beslagvrije voet",
        "value": "850",
        "issuer": "Gerechtsdeurwaarder",
        "issued": "false"
    },
];

const invorderingenURL = 'http://localhost:9000/invorderingen';
const credentialsURL = 'http://localhost:9000/credentials';


function insertRecords(raw, url) {
    // POST simulated records set in the collection
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${url}/insert`, requestOptions)
        .then(response => response.text())
        .catch(error => alert('error', error));
}

function deleteRecords(url) {
    // DELETE simulated records set in the collection
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
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
            case type = "nochange":
                for (var i = 0; i < nochangeSimulation.length; i++) {
                    wait(100);
                    var json = JSON.stringify(nochangeSimulation[i]);
                    insertRecords(json, invorderingenURL);
                }
                break;
            case type = "rules":
                for (var j = 0; j < rulesSimulation.length; j++) {
                    wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(rulesSimulation[j]);
                    insertRecords(json, invorderingenURL);
                }
                // eslint-disable-next-line
                for (var j = 0; j < credentialsSimulation.length; j++) {
                    wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(credentialsSimulation[j]);
                    insertRecords(json, credentialsURL);
                }
                break;
            default:
                for (var k = 0; k < intialBaselineInvorderingen.length; k++) {
                    wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(intialBaselineInvorderingen[k]);
                    insertRecords(json, invorderingenURL);
                }
                // eslint-disable-next-line
                for (var k = 0; k < intialBaselineCredentials.length; k++) {
                    wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(intialBaselineCredentials[k]);
                    insertRecords(json, credentialsURL);
                }
        }
    }

    handleSubmit(event) {
        // Advies Pim:
        // onSubmit, spinner op true zetten met setState, daarna (niet in callback) de runSimulation call doen.
        this.setState({ showSpinner: !this.state.showSpinner });
        // De setState triggert de render van de spinner, als het goed is.
        this.runSimulation(this.state.value);
        // aan het eind van runSimulation een call naar "retrieveData" die de GET calls doet
        // en setState aanroept met de te renderen data, samen met spinner op false.
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleDelete(event) {
        deleteRecords(invorderingenURL);
        deleteRecords(credentialsURL);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Select your simulation:
                    <select class="ui selection dropdown" value={this.state.value} onChange={this.handleChange}>
                        <option value="default">Set initial baseline</option>
                        <option value="nochange">Run with no changes</option>
                        <option value="income">Show income change</option>
                        <option value="rules">New Rules Engine</option>
                    </select>
                </label>
                <p></p>
                <input class="ui primary button" type="submit" value="Run it!" />
                <input class="ui button" type="text" value="Reset" onClick={this.handleDelete} />
                <p></p>
                <div>
                    <Spinner show={this.state.showSpinner} />
                </div>
            </form>
        );
    }
}

export default Simulation
