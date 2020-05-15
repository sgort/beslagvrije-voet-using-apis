import React from 'react';
import { Card } from 'semantic-ui-react';
import UsersCard from './users-card-no-buttons';

export default function UsersList({ users }) {
    const cards = () => {
      return users.map(user => {
        return <UsersCard key={user._id} user={user} />;
      });
    };
  
    return <Card.Group>{cards()}</Card.Group>;
  }
