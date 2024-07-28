import React from 'react';
import { useHookstate } from '@hookstate/core';
import { formState } from '../state/storyFormState';

const QuestionInput = () => {
  const state = useHookstate(formState);

  return (
    <div>
      <label>
        Question:
        <input
          type="text"
          value={state.question.get()}
          onChange={(e) => state.question.set(e.target.value)}
          required
        />
      </label>
    </div>
  );
};

export default QuestionInput;