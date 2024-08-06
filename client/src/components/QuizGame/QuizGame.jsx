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
        selectedAnswer: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleAnswerChange = (event) => {
        state.selectedAnswer.set(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="quiz-game">
            <form onSubmit={handleSubmit} className="quizgame-form">
               <div className="question-section">
                    <h2>{state.questionText.get()}</h2>
               </div>
               <div className="answers-section">
                    <div className="answers-grid">
                    {state.answers.get().map((answer, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="radio"
                                    name="answer"
                                    value={answer}
                                    checked={state.selectedAnswer.get() === answer}
                                    onChange={handleAnswerChange}
                                />
                                {answer}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit">Submit Answer</button>
                </div>
            </form>
            {submitted && (
                <div>
                    <h3>Result:</h3>
                    {state.selectedAnswer.get() === state.correctAnswer.get() ? (
                        <p>Correct!</p>
                    ) : (
                        <p>Incorrect.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizGame;
