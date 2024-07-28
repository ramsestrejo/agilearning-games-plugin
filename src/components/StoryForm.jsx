// StoryForm.jsx
import React from 'react';
import { useHookstate } from '@hookstate/core';
import { formState } from '../state/storyFormState';
// import StoryText from './StoryText';
// import QuestionInput from './QuestionInput';
// import AnswerInput from './AnswerInput';
// import CorrectAnswerSelect from './CorrectAnswerSelect';

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
        {/* <StoryText />
        <QuestionInput />
        <AnswerInput />
        <CorrectAnswerSelect /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StoryForm;
