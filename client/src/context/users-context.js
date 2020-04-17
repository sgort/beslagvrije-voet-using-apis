import React, { useReducer, createContext } from 'react';

export const UsersContext = createContext();

const initialState = {
  users: [],
  user: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_USERS': {
      return {
        ...state,
        users: action.payload,
        user: {},
      };
    }
    case 'CREATE_USER': {
      return {
        ...state,
        users: [...state.users, action.payload],
        message: {
          type: 'success',
          title: 'Create Successful',
          content: action.payload.message, // Message is defined in the API controller
        },
      };
    }
    case 'FETCH_USER': {
      return {
        ...state,
        user: action.payload,
        message: {},
      };
    }
    case 'UPDATE_USER': {
      const user = action.payload;
      return {
        ...state,
        users: state.users.map(item =>
          item._id === user._id ? user : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: user.message, // Message is defined in the API controller
        },
      };
    }
    case 'DELETE_USER': {
      const _id = action.payload;
      return {
        ...state,
        users: state.users.filter(item => item._id !== _id),
        message: {
          type: 'success',
          title: 'Delete Successful',
          content: action.payload.message, // Message is defined in the API controller
        },
      };
    }
    case 'FLASH_MESSAGE': {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

export const UsersContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <UsersContext.Provider value={[state, dispatch]}>
      {children}
    </UsersContext.Provider>
  );
};