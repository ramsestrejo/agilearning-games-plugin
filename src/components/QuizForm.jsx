import React from 'react';

const QuizForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // handling quiz form submission
  };

  return (
    <div>
      <h1>Create a Quiz</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuizForm;