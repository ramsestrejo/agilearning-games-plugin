import { createState } from '@hookstate/core';

const initialState = [
     { id: 1, title: 'Watch a Video', description: 'Watch one video across any course', earned: false },
     { id: 2, title: 'Watch Five Videos', description: 'Watch five video across any courses', earned: false },
     { id: 3, title: 'Take a Quiz', description: 'Take your first quiz in any course', earned: false },
     { id: 4, title: 'Level Five', description: 'Gain experience to level up to level five', earned: false },
];

const achievementState = createState(initialState);

export default achievementState;