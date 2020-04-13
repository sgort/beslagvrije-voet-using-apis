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