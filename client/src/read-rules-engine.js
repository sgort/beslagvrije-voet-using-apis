import React, { Component } from "react";
import TextFileReader from './components/text-file-reader';
const RulesEngine = require("./test.yaml");

class ReadRulesEngine extends Component {
    render() {
        return (
            <div>
                <h1>Rules Engine config BVV</h1>
                <TextFileReader
                    txt={RulesEngine}
                />
            </div>
        )
    }
}

export default ReadRulesEngine;