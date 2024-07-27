import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useNavigate } from 'react-router-dom';
import { gameTypeState } from '../state/gameTypeState';
import './HomeScreen.css';

const HomeScreen = () => {
     const gameType = useHookstate(gameTypeState);
     const [selectedGameType, setSelectedGameType] = React.useState(gameType.get()[0].id);
     const navigate = useNavigate();

     const handleCreateGame = () => {
          console.log(`Create Game of type: ${selectedGameType}`);
     };

     const handleChangeGameType = (event) => {
          setSelectedGameType(event.target.value);
     };

     const handleJoinGame = () => {
          navigate('/join-game');
     };

     return (
          <div className="home-screen">
          <h1>Game App</h1>
               <div className="menu">
                    <div>
                         <label htmlFor="gameType">Select Game Type:</label>
                         <select
                         id="gameType"
                         value={selectedGameType}
                         onChange={handleChangeGameType}
                         >
                         {gameType.get().map(type => (
                         <option key={type.id} value={type.id}>
                         {type.name}
                         </option>
                         ))}
                         </select>
                         <button onClick={handleCreateGame}>Create Game</button>
                    </div>
                    <div>
                         <button onClick={handleJoinGame}>Join Game</button>
                    </div>
               </div>
          </div>
     );
};
 
export default HomeScreen;