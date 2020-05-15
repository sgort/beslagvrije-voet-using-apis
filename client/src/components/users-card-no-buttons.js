import React from 'react';
import { Card, Icon } from 'semantic-ui-react';


function UsersCard({ user }) {
  return (
    <Card color='blue'>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" /> {user.name}
          <img class="right floated mini ui image" src={require(`./../images/icon${Math.floor((Math.random() * 4) + 1)}.png`)} alt=""></img>
        </Card.Header>
        <Card.Description>
          <p>
            <Icon name="phone" /> {user.phone}
          </p>
          <p>
            <Icon name="building outline" /> {user.organisation}
          </p>
          <p>
            <Icon name="mail outline" /> {user.email}
          </p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default UsersCard