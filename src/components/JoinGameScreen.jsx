import React from 'react';
import { useHookstate } from '@hookstate/core';
import { gameCodeState } from '../state/gameCodeState.jsx';
import './HomeScreen.css';

const JoinGameScreen = () => {
     const gameCode = useHookstate(gameCodeState);
     const [username, setUsername] = React.useState('');

     const handleJoin = () => {
          // placeholder logic for joining a game
          console.log(`Join game with a code: ${gameCode.get()} and username: ${username}`);
     };

     return (
     <div className="home-screen">
          <h1>Join a Game</h1>
          <div className="menu">
               <div>
               <input
                    type="text"
                    placeholder="Enter a Game Code"
                    value={gameCode.get()}
                    onChange={(e) => gameCode.set(e.target.value)}
               />
               </div>
               <div>
               <input
                    type="text"
                    placeholder="Enter a Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
               />
               </div>
               <button onClick={handleJoin}>Join Game</button>
          </div>
     </div>
     );
};
 
export default JoinGameScreen;