import React from 'react';

const QuizCorrectAnswerSelect = ({ answersState, correctAnswerState }) => {
    const handleChange = (value) => {
        correctAnswerState.set(value);
    };

    return (
        <div>
            <label>
                Correct Answer:
                <select
                    value={correctAnswerState.get()}
                    onChange={(e) => handleChange(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select Correct Answer
                    </option>
                    {answersState.get().map((answer, index) => (
                        <option key={index} value={answer}>
                            {answer}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default QuizCorrectAnswerSelect;
