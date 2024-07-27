import { hookstate } from '@hookstate/core';

export const gameTypeState = hookstate([
  { id: 'Type1', name: 'Quiz' },
  { id: 'Type2', name: 'Story' },
]);