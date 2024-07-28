import React from 'react';
import { useHookstate } from '@hookstate/core';
import { formState } from '../state/storyFormState';

const AnswerInput = () => {
  const state = useHookstate(formState);

  const handleAddAnswer = () => {
    state.answers.merge(['']);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = state.answers.get().map((answer, i) => 
      i === index ? value : answer
    );
    state.answers.set(updatedAnswers);
  };

  return (
    <div>
      <label>Answers:</label>
      {state.answers.get().map((answer, index) => (
        <div key={index}>
          <input
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddAnswer}>
        Add Answer
      </button>
    </div>
  );
};

export default AnswerInput;
