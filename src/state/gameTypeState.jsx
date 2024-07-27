import { hookstate } from '@hookstate/core';

export const gameTypeState = hookstate([
  { id: 'Type1', name: 'Game' },
  { id: 'Type2', name: 'Story' },
]);