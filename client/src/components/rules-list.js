import React from 'react';
import { Card } from 'semantic-ui-react';
import RulesCard from './rules-card';

export default function RulesList({ users }) { // Usage of users instead of rules due to reducer / ie context
  const cards = () => {
    return users.map(user => {
      return <RulesCard key={user._id} user={user} />
    });
  };

  return <Card.Group>{cards()}</Card.Group>
}