import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UsersContext } from '../context/users-context';
import { flashErrorMessage } from './flash-message';

const { useContext } = React;

export default function UsersCard({ user }) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UsersContext);

  const deleteUser = async id => {
    try {
      const response = await axios.delete(`http://localhost:9000/users/${id}`);
      dispatch({
        type: 'DELETE_USER',
        payload: response.data,
      });
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" /> {user.name}
          <img class="right floated mini ui image" src={require(`./../images/icon${Math.floor((Math.random()*4)+1)}.png`)} alt=""></img>
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
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic color="green"
            as={Link}
            to={`/users/edit/${user._id}`}
          >
            Edit
          </Button>
          <Button
            basic color="red"
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}