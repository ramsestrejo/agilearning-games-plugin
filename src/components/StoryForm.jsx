import React from 'react';
import { useHookstate } from '@hookstate/core';
import { formState } from '../state/storyFormState';

const StoryForm = () => {
     const state = useHookstate(formState);
   
     const handleSubmit = (event) => {
       event.preventDefault();
       const storyData = state.get();
       console.log('Story Data:', storyData);
       // submit data to database
     };
   
     const handleAddAnswer = () => {
       state.answers.set([...state.answers.get(), '']);
     };
   
     const handleAnswerChange = (index, value) => {
       state.answers[index].set(value);
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
              <div>
                <label>
                  Correct Answer:
                  <select
                    value={state.correctAnswer.get()}
                    onChange={(e) => state.correctAnswer.set(e.target.value)}
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
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      };
      
      export default StoryForm;