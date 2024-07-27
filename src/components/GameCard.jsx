import React from 'react';
import './GameCard.css';

const GameCard = ({ type, onCreateGame }) => {
  return (
    <div className="game-type-card">
      <h2>{type.name}</h2>
      <p>{type.description}</p>
      <button onClick={() => onCreateGame(type.id)}>Create {type.name} Game</button>
    </div>
  );
};

export default GameCard;