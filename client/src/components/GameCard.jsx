import React from 'react';
import './GameCard.css';

const GameCard = ({ game, onCreateGame }) => {
     return (
     <div className="game-type-card">
          <h2>{game.name}</h2>
          <p>{game.description}</p>
          <button onClick={() => onCreateGame(game.name)}>Create {game.name} game</button>
     </div>
     );
};

export default GameCard;

