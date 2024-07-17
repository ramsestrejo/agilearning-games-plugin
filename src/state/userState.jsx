import { createState } from '@hookstate/core';

const initialState = {
     id: '',
     name: '',
     tasks: [],
     achievements: [],
     xp: 0,
     level: 1
};

const userState = createState(initialState);

export default userState;