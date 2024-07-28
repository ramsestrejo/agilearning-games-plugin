import React from 'react';
import { useHookstate } from '@hookstate/core';
import { formState } from '../state/storyFormState';
import AnswerInput from './AnswerInput';
import CorrectAnswerSelect from './CorrectAnswerSelect';

const StoryForm = () => {
  const state = useHookstate(formState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const storyData = state.get();
    console.log('Story Data:', storyData);
    // submit data to database
  };

  return (
    <div>
      <h1>Create a Story</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Story Text:
            <textarea
              value={state.storyText.get()}
              onChange={(e) => state.storyText.set(e.target.value)}
              required
            />
          </label>
        </div>
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
        <AnswerInput />
        <CorrectAnswerSelect />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StoryForm;
