import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { UsersContext } from '../context/users-context';
import { flashErrorMessage } from './flash-message';

export default function UsersForm({ user }) {
    const [state, dispatch] = useContext(UsersContext);
    const { register, errors, handleSubmit } = useForm({
        defaultValues: user
    });
    const [redirect, setRedirect] = useState(false);

    const createUser = async data => {
        try {
            const response = await axios.post('http://localhost:9000/users/signup', data);
            dispatch({
                type: 'CREATE_USER',
                payload: response.data,
            });
            setRedirect(true);
        } catch (error) {
            flashErrorMessage(dispatch, error);
        }
    };

    const updateUser = async data => {
        try {
            const response = await axios.patch(`http://localhost:9000/users/${user._id}`, data);
            dispatch({
                type: 'UPDATE_USER',
                payload: response.data,
            });
            setRedirect(true);
        } catch (error) {
            flashErrorMessage(dispatch, error);
        }
    };

    const onSubmit = async data => {
        if (user._id) {
            await updateUser(data);
        } else {
            await createUser(data);
        }
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <h1 style={{ marginTop: "1em" }}>
                    {user._id ? "Edit User" : "Add New User"}
                </h1>
                <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
                    <Form.Group widths="equal">
                        <Form.Field className={classnames({ error: errors.name })}>
                            <label htmlFor="name">
                                Name
                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    ref={register({ required: true, minLength: 2 })}
                                />
                            </label>
                            <span className="error">
                                {errors.name &&
                                    errors.name.type === 'required' &&
                                    'You need to provide a Name'}
                            </span>
                            <span className="error">
                                {errors.name &&
                                    errors.name.type === 'minLength' &&
                                    'Must be 2 or more characters'}
                            </span>
                        </Form.Field>
                        <Form.Field className={classnames({ error: errors.phone })}>
                            <label htmlFor="phone">
                                Phone
              <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder="Phone"
                                    ref={register({
                                        required: true,
                                        pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/,
                                    })}
                                />
                            </label>
                            <span className="error">
                                {errors.phone &&
                                    errors.phone.type === 'required' &&
                                    'You need to provide a Phone number'}
                            </span>
                            <span className="error">
                                {errors.phone &&
                                    errors.phone.type === 'pattern' &&
                                    'Phone number must be in International format'}
                            </span>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field className={classnames({ error: errors.email })}>
                        <label htmlFor="email">
                            Email
              <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Email"
                                ref={register({
                                    required: true,
                                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                })}
                            />
                        </label>
                        <span className="error">
                            {errors.email &&
                                errors.email.type === 'required' &&
                                'You need to provide an Email address'}
                        </span>
                        <span className="error">
                            {errors.email &&
                                errors.email.type === 'pattern' &&
                                'Invalid email address'}
                        </span>
                    </Form.Field>
                    <Form.Field className={classnames({ error: errors.password })}>
                        <label htmlFor="password">
                            Password
                <input
                                id="password"
                                name="password"
                                type="text"
                                placeholder="password"
                                ref={register({ required: true, minLength: 2 })}
                            />
                        </label>
                        <span className="error">
                            {errors.password &&
                                errors.password.type === 'required' &&
                                'You need to provide a Password'}
                        </span>
                        <span className="error">
                            {errors.password &&
                                errors.password.type === 'minLength' &&
                                'Must be 4 or more characters'}
                        </span>
                    </Form.Field>
                    <Button primary type="submit">
                        Signup
          </Button>
                </Form>
            </Grid.Column>
        </Grid>
    );
}