import React from 'react';
import { useHookstate } from '@hookstate/core';
import { gameTypeState } from '../state/gameTypeState.jsx';
import { useNavigate } from 'react-router-dom';
import GameCard from './GameCard';
import './CreateGameScreen.css';

const CreateGameScreen = () => {
  const gameType = useHookstate(gameTypeState);
  const navigate = useNavigate();

  const handleCreateGame = (gameTypeId) => {
    console.log(`Creating game of type: ${gameTypeId}`);
    // logic for creating a game here
  };

  return (
    <div className="create-game-screen">
      <h1>Create a Game</h1>
      <div className="menu">
        {gameType.get().map(type => (
          <GameCard 
            key={type.id} 
            type={type} 
            onCreateGame={handleCreateGame} 
          />
        ))}
      </div>
    </div>
  );
};

export default CreateGameScreen;