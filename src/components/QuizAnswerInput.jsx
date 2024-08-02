import React from 'react';

const QuizAnswerInput = ({ answersState }) => {
    const handleAddAnswer = () => {
        answersState.merge(['']);
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = answersState.get().map((answer, i) =>
            i === index ? value : answer
        );
        answersState.set(updatedAnswers);
    };

    return (
        <div>
            <label>Answers:</label>
            {answersState.get().map((answer, index) => (
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
    );
};

export default QuizAnswerInput;
