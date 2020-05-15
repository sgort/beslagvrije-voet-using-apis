import React from 'react';
import { Card } from 'semantic-ui-react';
import ResidentsCard from './residentscard';


export default function ResidentsList({ residents }) {
  const cards = () => {
      return <ResidentsCard key={residents.BSN} resident={residents} />;
  };

  return <Card.Group>{cards()}</Card.Group>;
}
