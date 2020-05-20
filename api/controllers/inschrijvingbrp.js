const fetch = require('node-fetch');

/* 
 * Due to technical issues with the reference implementation VNG as of May 6th, this has been replaced
 *
 * ERROR response:
{ type: 'https://docs.microsoft.com/en-us/dotnet/api/system.net.httpstatuscode?#System_Net_HttpStatusCode_InternalServerError',
  title: 'Interne server fout.',
  status: 500,
  detail: 'Onverwachte fout bij raadplegen op burgerservicenummer: Policy Falsified',
  instance: 'https://www.haalcentraal.nl/haalcentraal/api/brp/ingeschrevenpersonen/999994669',
  code: 'serverError' }
Error:  TypeError: Cannot read property 'aanschrijfwijze' of undefined
    at fetch.then.then.json (/home/steven/Development/beslagvrije-voet-using-apis/api/controllers/inschrijvingbrp.js:28:33)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:189:7)
GET /inschrijvingbrp/999994669 - - ms - -
 *
 *
 * Constant URL for Haal Centraal BRP API replaced by Lost Lemon variant
 * See: https://github.com/lostlemon/haal-centraal-brp-bevragen
 * 
 */
const haalCentraalAPIbaseURL = 'https://haalcentraal.lostlemon.nl/';


// Constant URL & API key value for Haal Centraal BRP API
//const haalCentraalAPIbaseURL = 'https://www.haalcentraal.nl/haalcentraal/api/brp';
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
            //    'x-api-key': haalCentraalAPIKey,
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *client
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            res.status(201).json({
                message: "Natuulijk Persoon found for BSN",
                BSN: json.burgerservicenummer,
                geslachtsnaam: json.naam.geslachtsnaam,
                voornamen: json.naam.voornamen,
                postcode: json.verblijfplaats.postcode,
                huisnummer: json.verblijfplaats.huisnummer,
                gemeente: json.verblijfplaats.gemeenteVanInschrijving.omschrijving,
                href: json._links.self.href // json._links.verblijfplaatshistorie.href for VNG & json._links.self.href for Lostlemon
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};