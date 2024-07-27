import React from 'react';
import { useState } from '@hookstate/core';
import { quizCodeState } from '../state/quizCodeState';

const HomeScreen = () => {
     const quizCode = useState(quizCodeState);

     const handleCreateQuiz = () => {
     // placeholder
     console.log('');
};

     const handleJoinQuiz = () => {
     // placeholder
     console.log('');
};

     return (
          <div>
          <h1>Quiz App</h1>
          <div>
          <button onClick={handleCreateQuiz}>Create a Quiz</button>
          </div>
          <div>
          <input
               type="text"
               placeholder="Enter a Quiz Code"
               value={quizCode.get()}
               onChange={(e) => quizCode.set(e.target.value)}
          />
          <button onClick={handleJoinQuiz}>Join Quiz</button>
          </div>
          </div>
     );
};
 
export default HomeScreen;