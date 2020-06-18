import React, { Component } from "react";

/**
 * External json files holding the records for simulation
 */
const intialBaselineInvorderingenBanken = require('./../simulations/baseline_invorderingen_banken.json');
const intialBaselineCredentials = require('./../simulations/baseline-credentials.json');
const incomechangeSimulationInvorderingenbanken = require('./../simulations/income_change_invorderingen_banken.json');
const incomechangeSimulationInvorderingenwehkamp = require('./../simulations/income_change_invorderingen_wehkamp.json');
const incomechangeSimulationInvorderingenoverheid = require('./../simulations/income_change_invorderingen_overheid.json');
const bvvchangeSimulation = require('./../simulations/bvv-change-invorderingen.json');
const restSimulation = require('./../simulations/rest-invorderingen.json');
const restSimulationCredentials = require('./../simulations/rest-credentials.json');

const invorderingenURL = 'http://localhost:9000/invorderingen';
const invorderingenbankenURL = 'http://localhost:9000/invorderingenbanken';
const invorderingenoverheidURL = 'http://localhost:9000/invorderingenoverheid';
const invorderingenwehkampURL = 'http://localhost:9000/invorderingenwehkamp';
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
             * 0: Uitgangssituatie
             */
            case type = "baseline":
                for (var k = 0; k < intialBaselineInvorderingenBanken.length; k++) {
                    // eslint-disable-next-line
                    var json = JSON.stringify(intialBaselineInvorderingenBanken[k]);
                    insertRecords(json, invorderingenbankenURL);
                }
                // eslint-disable-next-line
                for (var k = 0; k < intialBaselineCredentials.length; k++) {
                    // eslint-disable-next-line
                    var json = JSON.stringify(intialBaselineCredentials[k]);
                    insertRecords(json, credentialsURL);
                }
                break;
            /**
             * 1: Tot wijziging inkomen
             * Just the invorderingen; income credential is inserted via IRMA app verification (see: list_credentials.js)
             */
            case type = "incomechange":
                for (var j = 0; j < incomechangeSimulationInvorderingenbanken.length; j++) {
                    // eslint-disable-next-line
                    var json = JSON.stringify(incomechangeSimulationInvorderingenbanken[j]);
                    insertRecords(json, invorderingenbankenURL);
                }
                // eslint-disable-next-line
                for (var j = 0; j < incomechangeSimulationInvorderingenwehkamp.length; j++) {
                    // eslint-disable-next-line
                    var json = JSON.stringify(incomechangeSimulationInvorderingenwehkamp[j]);
                    insertRecords(json, invorderingenwehkampURL);
                }
                // eslint-disable-next-line
                for (var j = 0; j < incomechangeSimulationInvorderingenoverheid.length; j++) {
                    // eslint-disable-next-line
                    var json = JSON.stringify(incomechangeSimulationInvorderingenoverheid[j]);
                    insertRecords(json, invorderingenoverheidURL);
                }
                break;
            /**
             * 2: Verandering bvv
             */
            case type = "bvvchange":
                for (var l = 0; l < bvvchangeSimulation.length; l++) {
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
                    // eslint-disable-next-line
                    var json = JSON.stringify(restSimulation[n]);
                    insertRecords(json, invorderingenURL);
                }
                // eslint-disable-next-line
                for (var n = 0; n < restSimulationCredentials.length; n++) {
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
        deleteRecords(invorderingenbankenURL);
        deleteRecords(invorderingenwehkampURL);
        deleteRecords(invorderingenoverheidURL);
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
