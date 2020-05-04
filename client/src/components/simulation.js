import React, { Component } from "react";
import { Form, Button } from 'semantic-ui-react';

function runSimulation() {
    // POST invorderingen set in the collection
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "BSN": "999994669",
        "beslag_object": "Werkloos uitkering",
        "samenloop": "false",
        "beslaglegger": "Waterschap Groot Salland",
        "openstaande_vordering": "252",
        "beslagvrije_voet": "892.50",
        "invordering": "63"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:9000/invorderingen/insert", requestOptions)
        .then(response => response.text())
        .then(result => alert(result))
        .catch(error => alert('error', error));
}

class Simulation extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            options: [
                { value: '1', text: 'Default - no changes' },
                { value: '2', text: 'Income changes' },
                { value: '3', text: 'New Rules Engine' },
            ],
            selected: ['1'] // <== Here, the values of selected options
        });
    }

    // handler recieves the `e` event object
    handleSubmit(e) {
        alert('Running simulation...');
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Dropdown
                        placeholder="Select Simulation"
                        width={6}
                        multiple selection
                        options={this.state.options}
                        onChange={this.handleMultiChange}
                        defaultValue={this.state.selected} // <== here the default values
                    />
                    <Button color="primary" type="submit">Run it!</Button>
                </Form>
            </div>
        );
    }
}

export default Simulation;