import React, { Component } from 'react';
const irma = require('@privacybydesign/irmajs');

function doIssuanceSession() {
    const attrs = ["Yes", "Yes", "Yes", "No"];
    doSession({
        '@context': 'https://irma.app/ld/request/issuance/v2',
        'credentials': [{
            'credential': 'irma-demo.MijnOverheid.ageLower',
            'attributes': { 'over12': attrs[0], 'over16': attrs[1], 'over18': attrs[2], 'over21': attrs[3] }
        }]
    }).then(function (result) { showSuccess('Success'); });
}

function doSession(request) {
    clearOutput();
    showSuccess('Demo running...');

    //const server = document.getElementById('server').value;
    //const authmethod = document.getElementById('method').value;
    //const key = document.getElementById(authmethod === 'publickey' ? 'key-pem' : 'key').value;
    //const requestorname = document.getElementById('requestor').value;
    const server = 'http://localhost:8088';
    const authmethod = "none";
    const key = "";
    const requestorname = "";

    return irma.startSession(server, request, authmethod, key, requestorname)
        .then(function (pkg) { return irma.handleSession(pkg.sessionPtr, { server: server, token: pkg.token, method: 'popup', language: 'en' }); })
        .then(function (result) {
            console.log('Done', result);
            return result;
        })
        .catch(function (err) { showError(err); });
}


// UI handling functions
function clearOutput() {
    const e = document.getElementById('result');
    e.setAttribute('hidden', 'true');
    e.classList.remove('succes', 'warning', 'error');
}
function showError(err) {
    const e = document.getElementById('result');
    e.removeAttribute('hidden');
    e.classList.remove('success');
    if (err === irma.SessionStatus.Cancelled) {
        e.classList.add('warning');
        e.innerText = 'Session was aborted';
    } else {
        e.classList.add('error');
        e.innerText = 'Error occurred: ' + String(err);
    }
    throw err;
}
function showSuccess(text) {
    const e = document.getElementById('result');
    e.innerHTML = text;
    e.removeAttribute('hidden');
    e.classList.add('success');
}


class Credentials extends Component {
  state = {};

  componentDidMount() {
    fetch('http://localhost:9000/credentials')
      .then(res => res.json())
      .then(this.onLoad);
  }

  parseData(data) {
    return data;
  }

  onLoad = data => {
    this.setState({
      data: this.parseData(data.credentials)
    });
  };

  render() {
    const { data } = this.state;

    return data ? this.renderData(data) : this.renderLoading();
  }

  renderData(data) {
    if (data && data.length > 0) {
      return (
        <div className="Status">
          <p className="Status credentials">Obtained credential(s): </p>
          <p>BSN | type | value | issuer</p>
          {data.map(item => (
            <div key={item.id}>
              <p>{item.BSN} | {item.type} | {item.value} | {item.issuer}</p>
            </div>
          ))}

<div id="result" class="status" hidden></div>
          <p className="Issue credentials"><button onClick={doIssuanceSession}>Issue this!</button></p>
        </div>
      )
    } else {
      return <div>No items found</div>;
    }
  }

  renderLoading() {
    return <div>Fetching records...</div>;
  }
}

export default Credentials;