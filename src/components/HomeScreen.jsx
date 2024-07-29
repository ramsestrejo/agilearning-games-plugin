import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useNavigate } from 'react-router-dom';
import { gameTypeState } from '../state/gameTypeState.jsx';
import './HomeScreen.css';

const HomeScreen = () => {
     const navigate = useNavigate();
 
     const handleCreateGame = () => {
         navigate('/create-game');
     };
 
     const handleJoinGame = () => {
         navigate('/join-game');
     };
 
     return (
         <div className="home-screen">
             <h1>AgiLearning Game App</h1>
             <div className="menu">
                 <button className="menu-button" onClick={handleCreateGame}>Create Game</button>
                 <button className="menu-button" onClick={handleJoinGame}>Join Game</button>
             </div>
         </div>
     );
 };
 
export default HomeScreen;