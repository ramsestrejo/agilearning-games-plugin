import React from 'react';
import { useHookstate } from '@hookstate/core';
import { formState } from '../state/storyFormState';

const CorrectAnswerSelect = () => {
  const state = useHookstate(formState);

  const handleChange = (event) => {
    state.correctAnswer.set(event.target.value);
  };

  return (
    <div>
      <label>
        Correct Answer:
        <select
          value={state.correctAnswer.get()}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Correct Answer
          </option>
          {state.answers.get().map((answer, index) => (
            <option key={index} value={answer}>
              {answer}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default CorrectAnswerSelect;
