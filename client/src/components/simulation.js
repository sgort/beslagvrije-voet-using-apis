import React, { Component } from "react";

/**
 * External json files holding the records for simulation
 */
const intialBaselineInvorderingen = require('./../simulations/baseline-invorderingen.json');
const intialBaselineCredentials = require('./../simulations/baseline-credentials.json');
const incomechangeSimulation = require('./../simulations/income-change-invorderingen.json');
const bvvchangeSimulation = require('./../simulations/bvv-change-invorderingen.json');
const restSimulation = require('./../simulations/rest-invorderingen.json');
const restSimulationCredentials = require('./../simulations/rest-credentials.json');
const nochangesSimulation = require('./../simulations/no-changes.json');
const nochangesSimulationCredentials = require('./../simulations/no-changes-credentials.json');

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
            value: localStorage.getItem("simStepLocalStorage"),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    runSimulation(type) {
        switch (type) {
            /**
             * 0..3: Volledige looptijd
             */
            case type = "nochange":
                for (var i = 0; i < nochangesSimulation.length; i++) {
                    //wait(100);
                    var json = JSON.stringify(nochangesSimulation[i]);
                    insertRecords(json, invorderingenURL);
                }
                // eslint-disable-next-line
                for (var i = 0; i < nochangesSimulationCredentials.length; i++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(nochangesSimulationCredentials[i]);
                    insertRecords(json, credentialsURL);
                }
                break;
            /**
             * 0: Uitgangssituatie
             */
            case type = "baseline":
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
                break;
            /**
             * 1: Wijziging inkomen
             */
            case type = "incomechange":
                for (var j = 0; j < incomechangeSimulation.length; j++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(incomechangeSimulation[j]);
                    insertRecords(json, invorderingenURL);
                }
                break;
            /**
             * 2: Verandering bvv
             */
            case type = "bvvchange":
                for (var l = 0; l < bvvchangeSimulation.length; l++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(bvvchangeSimulation[l]);
                    insertRecords(json, invorderingenURL);
                }
                break;
            /**
             * 3: Afronding
             */
            case type = "rest":
                for (var n = 0; n < restSimulation.length; n++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(restSimulation[n]);
                    insertRecords(json, invorderingenURL);
                }
                // eslint-disable-next-line
                for (var n = 0; n < restSimulationCredentials.length; n++) {
                    //wait(100);
                    // eslint-disable-next-line
                    var json = JSON.stringify(restSimulationCredentials[n]);
                    insertRecords(json, credentialsURL);
                }
                break;
            /**
             * Kies
             */
            default:
        }
    }

    handleSubmit(event) {
        localStorage.setItem("simStepLocalStorage", this.state.value);
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
        localStorage.setItem("simStepLocalStorage", "default");
        window.location.assign('/baseline');
        event.preventDefault();
    }

    render() {
        const runSim = this.state.value;
        let image;
        if (runSim === "default") {
            image = <img src={require('./../images/PIEChartBVV0.jpg')} alt="" />;
        } else if (runSim === "baseline") {
            image = <img src={require('./../images/PIEChartBVV1.jpg')} alt="" />;
        } else if (runSim === "incomechange") {
            image = <img src={require('./../images/PIEChartBVV2.jpg')} alt="" />;
        } else if (runSim === "bvvchange") {
            image = <img src={require('./../images/PIEChartBVV3.jpg')} alt="" />;
        } else {
            image = <img src={require('./../images/PIEChartBVV4.jpg')} alt="" />;
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Uit te voeren simulatie:
                    <select class="ui selection dropdown" value={this.state.value} onChange={this.handleChange}>
                        <option value="default">Kies</option>
                        <option value="baseline">0: Uitgangssituatie</option>
                        <option value="incomechange">1: Tot wijziging inkomen</option>
                        <option value="bvvchange">2: Tot verandering bvv</option>
                        <option value="rest">3: Afronding</option>
                        <option value="nochange">0..3: Volledige looptijd</option>
                    </select>
                </label>
                <p></p>
                <div>
                    <button class="ui primary button">Simuleren!</button>
                    <button class="ui secondary button" onClick={this.handleDelete}>Herstart</button>
                </div>
                <p></p>
                <p>
                    {image}
                </p>
            </form>
        );
    }
}

export default Simulation
