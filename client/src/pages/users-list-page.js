import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import UsersList from '../components/users-list';
import { UsersContext } from '../context/users-context';
import FlashMessage, { flashErrorMessage } from '../components/flash-message';


function UsersListPage() {
  const [state, dispatch] = useContext(UsersContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/users/');
        dispatch({
          type: 'FETCH_USERS',
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
      <h1>Lijst beslagleggers</h1>
      {state.message.content && <FlashMessage message={state.message} />}
      <UsersList users={state.users} />
    </div>
  );
}

export default UsersListPage;