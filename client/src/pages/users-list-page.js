import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import UsersList from '../components/users-list';
import { UsersContext } from '../context/users-context';


export default function UsersListPage() {
  const [state, dispatch] = useContext(UsersContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:9000/users/');
      dispatch({
        type: 'FETCH_USERS',
        payload: response.data.data || response.data // in case pagination is disabled
      });
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>List of Users</h1>
      <UsersList users={state.users} />
    </div>
  );
}


