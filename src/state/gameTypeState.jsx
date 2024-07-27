import { hookstate } from '@hookstate/core';

export const gameTypeState = hookstate([
  { id: 'Type1', name: 'Quiz', description: 'Info about the quiz type game here' },
  { id: 'Type2', name: 'Story', description: 'Info about the story type game here' },
]);