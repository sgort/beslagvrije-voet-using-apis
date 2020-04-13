import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

export default function UsersCard({ user }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" /> {user.name}
        </Card.Header>
        <Card.Description>
          <p>
            <Icon name="phone" /> {user.phone}
          </p>
          <p>
            <Icon name="mail outline" /> {user.email}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Edit
          </Button>
          <Button basic color="red">
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}