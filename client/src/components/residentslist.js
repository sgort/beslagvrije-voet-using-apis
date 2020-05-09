import React from 'react';
import { Card } from 'semantic-ui-react';
import ResidentsCard from './residentscard';

function json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });
    return result;
}

export default function ResidentsList({ residents }) {
    const residentsArray=json2array(residents);
    const cards = () => {
      return residentsArray.map(resident => {
        return <ResidentsCard key={resident.burgerservicenummer} resident={resident} />;
      });
    };
  
    return <Card.Group>{cards()}</Card.Group>;
  }
