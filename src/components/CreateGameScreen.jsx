import React from 'react';
import { useHookstate, hookstate } from '@hookstate/core';
import { gameTypeState } from '../state/gameTypeState.jsx';
import { useNavigate } from 'react-router-dom';
import GameCard from './GameCard';
import './CreateGameScreen.css';

const currentPageState = hookstate(0);

const CreateGameScreen = () => {
  const gameType = useHookstate(gameTypeState);
  const currentPage = useHookstate(currentPageState);
  const navigate = useNavigate();

  const handleCreateGame = (gameTypeId) => {
    console.log(`Creating game of type: ${gameTypeId}`);
    navigate(`/create-game/${gameTypeId.toLowerCase()}`);
  };

  const handleDotClick = (index) => {
    currentPage.set(index);
  };

  const totalPages = Math.ceil(gameType.get().length / 2);

  return (
    <div className="create-game-screen">
      <h1>Create a Game</h1>
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentPage.get() * 100}%)` }}
        >
          {gameType.get().map((type, index) => (
            <GameCard key={type.id} type={type} onCreateGame={handleCreateGame} />
          ))}
          </div>
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map(index => (
          <div
            key={index}
            className={`pagination-dot ${currentPage.get() === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateGameScreen;