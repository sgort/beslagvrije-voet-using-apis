import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UsersForm from '../components/users-form';
import { flashErrorMessage } from '../components/flash-message';
import { UsersContext } from '../context/users-context';

function UsersFormPage({ match }) {
    const [state, dispatch] = useContext(UsersContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { _id } = match.params; // Grab URL _id
        if (_id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:9000/users/${_id}`);
                    dispatch({
                        type: 'FETCH_USER',
                        payload: response.data.data[0],
                    });
                    setLoading(false);
                } catch (error) {
                    flashErrorMessage(dispatch, error);
                }
            };
            fetchData();
        } else {
            setLoading(false);
        }
    }, [match.params, dispatch]);

    if (loading) {
        return <p>Please wait...</p>;
    }

    return (
        <div>
            <UsersForm user={state.user} />
        </div>
    );
}

export default UsersFormPage;