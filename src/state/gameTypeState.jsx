import { hookstate } from '@hookstate/core';

export const gameTypeState = hookstate([
  { id: 'Type1', name: 'Quiz', description: 'Info about the quiz type game here' },
  { id: 'Type2', name: 'Story', description: 'Info about the story type game here' },
  { id: 'Type3', name: 'Kahoot', description: 'Info about the other type game here' },
  { id: 'Type4', name: 'Trivia', description: 'Info about the other type game here' },
  { id: 'Type5', name: 'Puzzle', description: 'Info about the other type game here' }
]);