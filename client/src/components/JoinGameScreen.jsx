import React from 'react';
import { useHookstate } from '@hookstate/core';
import './JoinGameScreen.css';

const JoinGameScreen = () => {
     const [username, setDisplayName] = React.useState('');

     const handleJoin = () => {
          // placeholder logic for joining a game
          // console.log(`Join a game using a code: ${gameCode.get()} and username: ${username}`);
     };

     return (
     <div className="join-game-screen">
          <div className="join-game-card">
               <h1>Join a Game</h1>
               <div className="join-form">
                    {/* <input
                         type="text"
                         placeholder="Enter a Game Code"
                         value={gameCode.get()}
                         onChange={(e) => gameCode.set(e.target.value)}
                    /> */}
                    <input
                         type="text"
                         placeholder="Enter a Display Name"
                         value={username}
                         onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <button onClick={handleJoin}>Join Game</button>
               </div>
          </div>
     </div>
     );
};
 
export default JoinGameScreen;
