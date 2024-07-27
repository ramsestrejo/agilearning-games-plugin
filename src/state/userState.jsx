import { createState } from '@hookstate/core';

const initialState = {
     id: '',
     name: '',
     score: 0,
};

const userState = createState(initialState);

export default userState;