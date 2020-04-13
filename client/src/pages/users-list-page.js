// src/pages/users-list-page.js

import React from 'react';
import UsersList from '../components/users-list';

const UsersListPage = () => {
    return (
        <div>
            <h1>List of Users</h1>
            <UsersList />
        </div>
    );
};

export default UsersListPage;