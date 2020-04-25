import React, { Component } from "react";
import TextFileReader from './components/text-file-reader';
const Yaml = require("./test.yaml");

class ReadYaml extends Component {
    render() {
        return (
            <div>
                <h1>Yaml Config BVV</h1>
                <TextFileReader
                    txt={Yaml}
                />
            </div>
        )
    }
}

export default ReadYaml;