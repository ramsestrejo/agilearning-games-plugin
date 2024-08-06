import React, { useState } from 'react';
import { useHookstate } from '@hookstate/core';
import './QuizGame.css';

//adding temporary data just to test and add styling to game
const initialState = {
     questionText: 'What is the square root of 36?',
     answers: ['4', '6', '3', '12'],
     correctAnswer: '6'
 };

const QuizGame = () => {
    const state = useHookstate({
        questionText: initialState.questionText,
        answers: initialState.answers,
        correctAnswer: initialState.correctAnswer,
        selectedAnswer: '',
        isSubmitted: false
    });

     const handleAnswerClick = (answer) => {
          if (!state.isSubmitted.get()) {
          state.selectedAnswer.set(answer);
          }
     };

    const handleSubmit = (event) => {
        event.preventDefault();
        state.isSubmitted.set(true);
    };

    const isCorrect = state.selectedAnswer.get() === state.correctAnswer.get();

    return (
        <div className="quiz-game">
            <form onSubmit={handleSubmit} className="quizgame-form">
               <div className="question-section">
                    <h2>{state.questionText.get()}</h2>
               </div>
               <div className="answers-section">
                    <div className="answers-grid">
                    {state.answers.get().map((answer, index) => {
                            const isSelected = state.selectedAnswer.get() === answer;
                            const isCorrect = state.correctAnswer.get() === answer;

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
                    <button type="submit" className="submit-button" disabled={state.isSubmitted.get()}>Submit Answer</button>
                </div>
            </form>
        </div>
    );
};

export default QuizGame;
