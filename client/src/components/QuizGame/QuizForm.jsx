import React from 'react';
import { useHookstate } from '@hookstate/core';
import QuizBlockInput from './QuizBlockInput';
import './QuizForm.css';
import { useNavigate } from 'react-router-dom';

const generateGameCode = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
};

const QuizForm = () => {
    const state = useHookstate({
        questions: [
            {
                questionText: '',
                answers: [''],
                correctAnswer: ''
            }
        ]
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const quizData = state.get();
        console.log('Quiz Data:', quizData);
        
        const gameCode = generateGameCode();

        // logic here for storing the quiz data and game code in database

        navigate('/creation-success', { state: { gameCode } });
    };

    const handleAddQuestion = () => {
        state.questions.merge([{
            questionText: '',
            answers: [''],
            correctAnswer: ''
        }]);
    };

    return (
        <form className="quiz-form" onSubmit={handleSubmit}>
            {state.questions.map((questionState, index) => (
                <QuizBlockInput key={index} index={index} blockState={questionState} />
            ))}
            <button className="add-question-btn" type="button" onClick={handleAddQuestion}>Add Question</button>
            <button className="submit-quiz-btn" type="submit">Submit Quiz</button>
        </form>
    );
};

export default QuizForm;
