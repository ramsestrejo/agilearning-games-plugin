import React, { useState, useEffect } from 'react';
import { useHookstate } from '@hookstate/core';
import './QuizGame.css';

//adding temporary data just to test and add styling to game
const quizData = [
     {
         questionText: 'What is the square root of 36?',
         answers: ['4', '6', '3', '12'],
         correctAnswer: '6'
     },
     {
         questionText: 'Question 2?',
         answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
         correctAnswer: 'Answer 1'
     },
     {
         questionText: 'Question 3?',
         answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
         correctAnswer: 'Answer 4'
     }
 ];

const QuizGame = () => {
    const [timer, setTimer] = useState(30);
    const state = useHookstate({
        currentQuestionIndex: 0,
        selectedAnswer: '',
        isSubmitted: false,
        score: 0,
        quizData: quizData
    });

     useEffect(() => {
        const currentQuestionIndex = state.currentQuestionIndex.get();
        state.selectedAnswer.set('');
        state.isSubmitted.set(false);

        setTimer(30);
        const timerId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    handleTimerExpire();
                    clearInterval(timerId);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [state.currentQuestionIndex.get()]);

     const currentQuestion = state.quizData.get()[state.currentQuestionIndex.get()];
     const isCorrect = state.selectedAnswer.get() === currentQuestion.correctAnswer;

     const handleAnswerClick = (answer) => {
        if (!state.isSubmitted.get()) {
            state.selectedAnswer.set(answer);
            state.isSubmitted.set(true);
            
            if (answer === currentQuestion.correctAnswer) {
                state.score.set(state.score.get() + 1);
            }

            setTimeout(() => {
                const nextIndex = state.currentQuestionIndex.get() + 1;
                if (nextIndex < state.quizData.get().length) {
                    state.currentQuestionIndex.set(nextIndex);
                }
                state.isSubmitted.set(false);
            }, 2000);
        }
    };

  const handleTimerExpire = () => {
    if (!state.isSubmitted.get()) {
        state.selectedAnswer.set('');
        state.isSubmitted.set(true);

        setTimeout(() => {
            const nextIndex = state.currentQuestionIndex.get() + 1;
            if (nextIndex < state.quizData.get().length) {
                state.currentQuestionIndex.set(nextIndex);
            }
            state.isSubmitted.set(false);
        }, 2000);
    }
};

    return (
        <div className="quiz-game">
            <div className="quizgame-form">
               <div className="question-section">
               <h2>{currentQuestion.questionText}</h2>
               </div>
               <div className="answers-section">
                    <div className="answers-grid">
                    {currentQuestion.answers.map((answer, index) => {
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
                </div>
            <div className="timer-section">
                <h3>Time Left: {timer}s</h3>
            </div>
            <div className="score-section">
                <h3>Score: {state.score.get()}</h3>
            </div>
            </div>
        </div>
    );
};

export default QuizGame;
