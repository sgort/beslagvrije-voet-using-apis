import React from 'react';
import { Card } from 'semantic-ui-react';
import RulesCard from './rules-card';


export default function RulesList({ users }) { // Usage of users instead of rules due to reducer / context
  const cards = () => {
    return users.map(user => {
      return <RulesCard key={user._id} user={user} />
    }).shift(); // shift() returns the first item in the array without raising an error if the array is empty
  };

  return <Card.Group>{cards()}</Card.Group>
}
