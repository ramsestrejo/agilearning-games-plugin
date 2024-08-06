import React, { useState, useEffect } from 'react';
import { useHookstate } from '@hookstate/core';
import './StoryGame.css';

// temporary data just to test and add styling to game
const storyData = [
  {
    storyText: 'Piece of story text 1.',
    questionText: 'Question 1?',
    answers: ['Answer 1', 'Answer 2'],
    correctAnswer: 'Answer 1'
  },
  {
    storyText: 'Piece of story text 2.',
    questionText: 'Question 2?',
    answers: ['Answer 1', 'Answer 2'],
    correctAnswer: 'Answer 2'
  },
  {
    storyText: 'Piece of story text 3.',
    questionText: 'Question 3?',
    answers: ['Yes', 'No'],
    correctAnswer: 'Yes'
  }
];

const StoryGame = () => {
     const state = useHookstate({
       currentSegmentIndex: 0,
       selectedAnswer: '',
       isSubmitted: false,
       storyData: storyData
     });
   
     useEffect(() => {
       state.selectedAnswer.set('');
       state.isSubmitted.set(false);
     }, [state.currentSegmentIndex.get()]);
   
     const currentSegment = state.storyData.get()[state.currentSegmentIndex.get()];
     const isCorrect = state.selectedAnswer.get() === currentSegment.correctAnswer;
   
     const handleAnswerClick = (answer) => {
       if (!state.isSubmitted.get()) {
         state.selectedAnswer.set(answer);
       }
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          state.isSubmitted.set(true);
      
          setTimeout(() => {
            const nextIndex = state.currentSegmentIndex.get() + 1;
            if (nextIndex < state.storyData.get().length) {
              state.currentSegmentIndex.set(nextIndex);
            }
            state.isSubmitted.set(false);
          }, 2000);
        };

        return (
          <div className="story-game">
            <form onSubmit={handleSubmit} className="storygame-form">
              <div className="story-section">
                <p>{currentSegment.storyText}</p>
              </div>
              <div className="question-section">
                <h2>{currentSegment.questionText}</h2>
                <div className="answers-grid">
                  {currentSegment.answers.map((answer, index) => {
                    const isSelected = state.selectedAnswer.get() === answer;
                    return (
                      <button
                        key={index}
                        className={`answer-button ${
                          isSelected
                            ? (state.isSubmitted.get() ? (isCorrect ? 'correct' : 'incorrect') : 'selected')
                            : ''
                        }`}
                        onClick={() => handleAnswerClick(answer)}
                        type="button"
                        disabled={state.isSubmitted.get()}
                      >
                        {answer}
                      </button>
                    );
                  })}
                </div>
                <button type="submit" className="submit-button" disabled={state.isSubmitted.get()}>
                  Submit Answer
                </button>
              </div>
            </form>
          </div>
        );
      };
      
      export default StoryGame;