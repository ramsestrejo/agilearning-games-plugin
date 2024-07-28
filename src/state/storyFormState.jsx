import { hookstate } from '@hookstate/core';

const initialFormState = {
  storyText: '',
  question: '',
  answers: [''],
  correctAnswer: '',
};

export const formState = hookstate(initialFormState);