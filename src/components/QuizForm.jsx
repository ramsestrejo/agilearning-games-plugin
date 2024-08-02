import React from 'react';
import { useHookstate } from '@hookstate/core';
import QuizQuestionInput from './QuizQuestionInput';

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
        <form onSubmit={handleSubmit}>
            {state.questions.map((questionState, index) => (
                <QuizQuestionInput key={index} index={index} questionState={questionState} />
            ))}
            <button type="button" onClick={handleAddQuestion}>Add Question</button>
            <button type="submit">Submit Quiz</button>
        </form>
    );
};

export default QuizForm;
