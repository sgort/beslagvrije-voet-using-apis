import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { UsersContext } from '../context/users-context';

const { useContext } = React;

export default function RulesCard({ user }) {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(UsersContext);

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    <Icon name="address card outline" /> {user.reference} - {user.issuer}
                </Card.Header>
                <Card.Description>
                    <p>
                        <Icon name="clock outline" /> {user.date_start}
                    </p>
                    <p>
                        <Icon name="stop circle outline" /> {user.date_end}
                    </p>
                    <p>
                        <Icon name="code" /> {user.rules}
                    </p>
                </Card.Description>
            </Card.Content>
        </Card>
    );
}