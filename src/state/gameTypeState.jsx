import { hookstate } from '@hookstate/core';

export const gameTypeState = hookstate([
  { id: 'quiz', name: 'Quiz', description: 'Info about the quiz type game here' },
  { id: 'story', name: 'Story', description: 'Info about the story type game here' },
  { id: 'type3', name: 'Kahoot', description: 'Info about the other type game here' },
  { id: 'type4', name: 'Trivia', description: 'Info about the other type game here' },
  { id: 'type5', name: 'Puzzle', description: 'Info about the other type game here' }
]);