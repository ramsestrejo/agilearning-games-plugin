import React from 'react';
//import './QuizForm.css';

const QuizBlockInput = ({ index, blockState }) => {
    const questionText = blockState.questionText;
    const answers = blockState.answers;
    const correctAnswer = blockState.correctAnswer;

    const handleAddAnswer = () => {
        answers.merge(['']);
    };

    const handleAnswerChange = (i, value) => {
        const updatedAnswers = answers.get().map((answer, j) => 
            j === i ? value : answer
        );
        answers.set(updatedAnswers);
    };

    const handleRemoveAnswer = (i) => {
        const updatedAnswers = answers.get().filter((_, j) => j !== i);
        answers.set(updatedAnswers);
        if (correctAnswer.get() === answers.get()[i]) {
            correctAnswer.set('');
        }
    };

    const handleQuestionChange = (value) => {
        questionText.set(value);
    };

    return (
        <div className="story-block">
            <h3>Question Block {index + 1}</h3>
            <label>
                Question:
                <input
                    type="text"
                    value={questionText.get()}
                    onChange={(e) => handleQuestionChange(e.target.value)}
                    required
                />
            </label>
            <div>
                <label>Answers:</label>
                {answers.get().map((answer, i) => (
                    <div key={i} className="answer-container">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => handleAnswerChange(i, e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => handleRemoveAnswer(i)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddAnswer}>Add Answer</button>
            </div>
            <div>
                <label>
                    Correct Answer:
                    <select
                        value={correctAnswer.get()}
                        onChange={(e) => correctAnswer.set(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Correct Answer</option>
                        {answers.get().map((answer, i) => (
                            <option key={i} value={answer}>{answer}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default QuizBlockInput;
