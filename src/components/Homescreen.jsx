import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useHistory } from 'react-router-dom';
import { gameCodeState } from '../state/gameCodeState';

const HomeScreen = () => {
     const gameType = useHookstate(gameTypeState);
     const history = useHistory();

     const handleCreateGame = () => {
     // placeholder logic for creating a game
     console.log(`Create Game of type: ${gameType.get()}`);
     };

     const handleJoinGame = () => {
          history.push('/join-game');
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
                         <option value="Type1">Game</option>
                         <option value="Type2">Story</option>
                    </select>
                    <button onClick={handleCreateGame}>Create Game</button>
               </div>
               <div>
                    <button onClick={handleJoinGame}>Join Game</button>
               </div>
          </div>
     );
};
 
export default HomeScreen;