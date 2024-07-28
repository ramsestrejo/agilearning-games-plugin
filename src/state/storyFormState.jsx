// storyFormState.jsx
import { hookstate } from '@hookstate/core';

export const formState = hookstate({
  storyText: '',
  question: '',
  answers: [''], // Make sure this is a Hookstate array
  correctAnswer: ''
});
