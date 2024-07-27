import { hookstate } from '@hookstate/core';

const initialState = {
     id: '',
     name: '',
};

const userState = hookstate(initialState);

export default userState;