import { hookstate } from '@hookstate/core';

const initialState = {
     id: '',
     name: '',
     score: 0,
};

const userState = hookstate(initialState);

export default userState;