import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useNavigate } from 'react-router-dom';
import { gameTypeState } from '../state/gameTypeState';
import './HomeScreen.css';

const HomeScreen = () => {
     const gameType = useHookstate(gameTypeState);
     const navigate = useNavigate();

     const handleCreateGame = () => {
          navigate('/create-game');
     };

     const handleJoinGame = () => {
          navigate('/join-game');
     };

     return (
          <div className="home-screen">
          <h1>Game App</h1>
               <div className="menu">
                    <div>
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