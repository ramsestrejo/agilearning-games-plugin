import { hookstate } from '@hookstate/core';

export const formState = hookstate({
  storyText: '',
  question: '',
  answers: [''],
  correctAnswer: ''
});