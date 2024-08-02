import React from 'react';
import { useHookstate } from '@hookstate/core';
import { useNavigate } from 'react-router-dom';
import GameCard from './GameCard';
import './CreateGameScreen.css';

const CreateGameScreen = () => {
  const gameType = useHookstate([
    { id: 'quiz', name: 'Quiz', description: 'Info about the quiz type game here' },
    { id: 'story', name: 'Story', description: 'Info about the story type game here' },
    { id: 'type3', name: 'Trivia', description: 'Coming soon!' },
    { id: 'type4', name: 'Puzzle', description: 'Coming soon!' },
    { id: 'type5', name: 'Other', description: 'Coming soon!' }
  ]);

  const currentPage = useHookstate(0);
  const navigate = useNavigate();

  const handleCreateGame = (gameTypeId) => {
    console.log(`Creating game of type: ${gameTypeId}`);
    navigate(`/create-game/${gameTypeId.toLowerCase()}`);
  };

  const handleDotClick = (index) => {
    currentPage.set(index);
  };

  const handleArrowClick = (direction) => {
    const totalPages = Math.ceil(gameType.get().length / 2);
    let newPage = currentPage.get() + (direction === 'left' ? -1 : 1);

    if (newPage < 0) newPage = totalPages - 1;
    if (newPage >= totalPages) newPage = 0;

    currentPage.set(newPage);
  };

  const cardsPerPage = 2;
  const totalPages = Math.ceil(gameType.get().length / cardsPerPage);

  return (
    <div className="create-game-screen">
      <h1>Choose a type of game to create</h1>
      <div className="carousel-container">
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{ transform: `translateX(-${currentPage.get() * (100 / totalPages)}%)`, width: `${totalPages * 100}%` }}
          >
            {gameType.get().map((type) => (
              <GameCard key={type.id} type={type} onCreateGame={handleCreateGame} />
            ))}
          </div>
        </div>
        <div className="pagination-container">
        <div
          className="arrow arrow-left"
          onClick={() => handleArrowClick('left')}
        />
        <div className="pagination">
          {[...Array(totalPages).keys()].map(index => (
            <div
              key={index}
              className={`pagination-dot ${currentPage.get() === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
        <div
          className="arrow arrow-right"
          onClick={() => handleArrowClick('right')}
        />
        </div>
      </div>
    </div>
  );
};

export default CreateGameScreen;