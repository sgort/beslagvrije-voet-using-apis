const fetch = require('node-fetch');

// Constant URL & API key value for Haal Centraal BRP API
const haalCentraalAPIbaseURL = 'https://www.haalcentraal.nl/haalcentraal/api/brp';
const haalCentraalAPIKey = 'drsgPGjarGGRl2pKQTnLqfj3NfsTPBhR';

exports.inschrijvingbrp_find_one = (req, res, next) => {
    const BSN = req.params.BSN
    fetch(haalCentraalAPIbaseURL + '/ingeschrevenpersonen/' + BSN, {
        // Default options are marked with *
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'x-api-key': haalCentraalAPIKey,
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *client
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.status(201).json({
                message: "Natuulijk Persoon found for BSN: " + BSN,
                naam: json.naam.aanschrijfwijze,
                leeftijd: json.leeftijd,
                gemeente: json.verblijfplaats.gemeenteVanInschrijving.omschrijving
            })
        })
        .catch(err => console.error('Error: ', err));
}


