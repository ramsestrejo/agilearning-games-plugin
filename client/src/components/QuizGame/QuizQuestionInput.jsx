import React from 'react';
import QuizAnswerInput from './QuizAnswerInput';
import QuizCorrectAnswerSelect from './QuizCorrectAnswerSelect';

const QuizQuestionInput = ({ index, questionState }) => {
    const handleQuestionChange = (value) => {
        questionState.questionText.set(value);
    };

    return (
        <div>
            <h3>Question {index + 1}</h3>
            <label>
                Question:
                <input
                    type="text"
                    value={questionState.questionText.get()}
                    onChange={(e) => handleQuestionChange(e.target.value)}
                    required
                />
            </label>
            <QuizAnswerInput answersState={questionState.answers} />
            <QuizCorrectAnswerSelect answersState={questionState.answers} correctAnswerState={questionState.correctAnswer} />
        </div>
    );
};

export default QuizQuestionInput;
