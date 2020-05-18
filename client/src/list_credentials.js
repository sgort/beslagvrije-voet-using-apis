import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
const irma = require('@privacybydesign/irmajs');

function doIssuanceSession(attrs) {
  //  const attrs = ["892.5", "Sanne Voorspoed", "1050"];
  doSession({
    '@context': 'https://irma.app/ld/request/issuance/v2',
    'credentials': [{
      'credential': 'irma-demo.discipl.demoBVV',
      'attributes': { 'calculatedBVV': attrs[0], 'debtCollector': attrs[1], 'incomeUsedForBVV': attrs[2] }
    }]
  }).then(function (result) { showSuccess('Success'); });
}

function doSession(request) {
  clearOutput();
  showSuccess('Issuance running...');

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
    e.innerText = 'Session was cancelled';
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
  e.classList.add('Success');
}

class ObtainedCredentials extends Component {
  state = {
    Issued: false
  };

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
      data: this.parseData(data.data)
    });
  };

  render() {
    const { data } = this.state;

    return data ? this.renderData(data) : this.renderLoading();
  }

  renderData(data) {
    if (data && data.length > 0) {
      return (
        <div>
          <h1>Obtained credentials</h1>
          <Card.Group>
            {data.map(item => (
              <Card color='blue' >
                <Card.Content>
                  <Card.Header>
                    <Icon name="edit outline" /> {item.type}
                  </Card.Header>
                  <Card.Description>
                    <p>
                      {item.type !== "Gerechtsdeurwaarder" && <Icon name="euro sign" />}
                      {item.type === "Gerechtsdeurwaarder" && <Icon name="handshake outline" />} {item.value}
                      <img class="right floated mini ui image" src={require(`./images/certificate${Math.floor((Math.random() * 4) + 1)}.png`)} alt=""></img>
                    </p>
                    <p>
                      <Icon name="user outline" /> {item.BSN}
                    </p>
                    <p>
                      <Icon name="clock outline" /> {item.timestamp.substring(0, 10)}
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          <p></p>
          <label>
            Select your preferred SSI:
            <select name="ssi-app" class="ui selection dropdown">
              <option value="default">IRMA</option>
              <option value="rabobank">Rabobank</option>
              <option value="schluss">Schluss</option>
              <option value="trustchain">TrustChain</option>
            </select>
          </label>
          <p></p>
          <div id="result" class="status" hidden></div>
          <p></p>
          <button class="ui primary button" onClick={() => { doIssuanceSession(["892.5", "Sanne Voorspoed", "1050"]) }}>Issue this!</button>
        </div>
      )
    } else {
      return <div>No credentials found</div>;
    }
  }

  renderLoading() {
    return <div>Fetching records...</div>;
  }
}

export default ObtainedCredentials;