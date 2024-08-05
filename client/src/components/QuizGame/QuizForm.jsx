import React from 'react';
import { useHookstate } from '@hookstate/core';
import QuizBlockInput from './QuizBlockInput';
import './QuizForm.css';

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const quizData = state.get();
        console.log('Quiz Data:', quizData);
        // logic to submit quiz data
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
