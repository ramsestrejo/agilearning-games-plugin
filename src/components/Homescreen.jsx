import React from 'react';
import { useHookstate } from '@hookstate/core';
import { gameTypeState } from '../state/gameTypeState';
import { quizCodeState } from '../state/gameCodeState';

const HomeScreen = () => {
     const quizCode = useHookstate(quizCodeState);
     const gameType = useHookstate(gameTypeState);

     const handleCreateGame = () => {
     // placeholder logic for creating a game
     console.log(`Create Game of type: ${gameType.get()}`);
};

     const handleJoinGame = () => {
     // placeholder logic for joining a game
     console.log(`Join Game with code: ${quizCode.get()}`);
};

     return (
          <div>
          <h1>Game App</h1>
               <div>
               <label htmlFor="gameType">Select Game Type:</label>
                    <select
                    id="gameType"
                    value={gameType.get()}
                    onChange={(e) => gameType.set(e.target.value)}
                    >
                         <option value="Type1">Quiz</option>
                         <option value="Type2">Story</option>
                    </select>
                    <button onClick={handleCreateGame}>Create Game</button>
               </div>
               <div>
                    <input
                    type="text"
                    placeholder="Enter a Game Code"
                    value={quizCode.get()}
                    onChange={(e) => quizCode.set(e.target.value)}
                    />
                    <button onClick={handleJoinGame}>Join Game</button>
               </div>
          </div>
     );
};
 
export default HomeScreen;