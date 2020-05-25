import React, { Component } from "react";

/**
 * External json files holding the records for simulation
 */
const intialBaselineInvorderingen = require('./../simulations/baseline-invorderingen.json');
const intialBaselineCredentials = require('./../simulations/baseline-credentials.json');
const nochangeSimulation = require('./../simulations/no-changes.json');
const rulesSimulationInvorderingen = require('./../simulations/rules-engine-invorderingen.json');
const rulesSimulationCredentials = require('./../simulations/rules-engine-credentials.json');
const rulesSimulationRules = require('./../simulations/rules-engine-rules.json');

const invorderingenURL = 'http://localhost:9000/invorderingen';
const credentialsURL = 'http://localhost:9000/credentials';
const rulesengineURL = 'http://localhost:9000/rulesengine'


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
        .catch(error => console.log('error', error));

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

class Simulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "default",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    runSimulation(type) {
        switch (type) {
            case type = "nochange":
                for (var i = 0; i < nochangeSimulation.length; i++) {
                    //wait(100);
                    var json = JSON.stringify(nochangeSimulation[i]);
                    insertRecords(json, invorderingenURL);
                }
                break;
            case type = "rules":
                for (var j = 0; j < rulesSimulationInvorderingen.length; j++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(rulesSimulationInvorderingen[j]);
                    insertRecords(json, invorderingenURL);
                }
                // eslint-disable-next-line
                for (var j = 0; j < rulesSimulationCredentials.length; j++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(rulesSimulationCredentials[j]);
                    insertRecords(json, credentialsURL);
                }
                // eslint-disable-next-line
                for (var j = 0; j < rulesSimulationRules.length; j++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(rulesSimulationRules[j]);
                    insertRecords(json, rulesengineURL);
                }
                break;
            default:
                for (var k = 0; k < intialBaselineInvorderingen.length; k++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(intialBaselineInvorderingen[k]);
                    insertRecords(json, invorderingenURL);
                }
                // eslint-disable-next-line
                for (var k = 0; k < intialBaselineCredentials.length; k++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(intialBaselineCredentials[k]);
                    insertRecords(json, credentialsURL);
                }
        }
    }

    handleSubmit(event) {
        this.runSimulation(this.state.value);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleDelete(event) {
        deleteRecords(invorderingenURL);
        deleteRecords(credentialsURL);
        deleteRecords(rulesengineURL);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Uit te voeren simulatie:
                    <select class="ui selection dropdown" value={this.state.value} onChange={this.handleChange}>
                        <option value="default">Uitgangssituatie</option>
                        <option value="nochange">Geen wijzigingen</option>
                    </select>
                </label>
                <p></p>
                <div>
                    <button class="ui primary button">Simuleren!</button>
                    <button class="ui secondary button" onClick={this.handleDelete}>Herstart</button>
                </div>
                <p></p>
                <p id="simulation"></p>
            </form>
        );
    }
}

export default Simulation
