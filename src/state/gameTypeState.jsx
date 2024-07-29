import { hookstate } from '@hookstate/core';

export const gameTypeState = hookstate([
  { id: 'quiz', name: 'Quiz', description: 'Info about the quiz type game here' },
  { id: 'story', name: 'Story', description: 'Info about the story type game here' },
  { id: 'type3', name: 'Trivia', description: 'Coming soon!' },
  { id: 'type4', name: 'Puzzle', description: 'Coming soon!' },
  { id: 'type5', name: 'Other', description: 'Coming soon!' }
]);