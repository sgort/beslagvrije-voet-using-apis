import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import RulesList from '../components/rules-list';
import { UsersContext } from '../context/users-context';
import FlashMessage, { flashErrorMessage } from '../components/flash-message';


export default function RulesListPage() {
    const [state, dispatch] = useContext(UsersContext); // keep context of reducer!

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/rulesengine/domain/BVV');
                dispatch({
                    type: 'FETCH_RULES', // added to reducer!
                    payload: response.data.data || response.data // in case pagination is disabled
                });
            } catch (error) {
                flashErrorMessage(dispatch, error);
            }
        };
        fetchData();
    }, [dispatch]);


    return (
        <div>
            <h1>Te hanteren regel(s)</h1>
            {state.message.content && <FlashMessage message={state.message} />}
            <RulesList users={state.users} />
        </div>
    );
}