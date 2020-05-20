import React from 'react';
import { Card, Icon } from 'semantic-ui-react';


function UsersCard({ user }) {
  return (
    <Card color='blue'>
      <Card.Content>
        <Card.Header>
          <p>
            <Icon name="building outline" /> {user.organisation}
            <img class="right floated mini ui image" src={require(`./../images/icon${Math.floor((Math.random() * 4) + 1)}.png`)} alt=""></img>
          </p>
        </Card.Header>
        <Card.Description>
          <p>
            <Icon basic color="red" name="edit outline" />{user.vordering}
          </p>
          <p>
            <Icon name="user outline" /> {user.name}
          </p>
          <p>
            <Icon name="phone" /> {user.phone}
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