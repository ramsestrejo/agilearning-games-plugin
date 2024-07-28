import React from 'react';

const StoryForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // handling story form submission
  };

  return (
    <div>
      <h1>Create a Story</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StoryForm;