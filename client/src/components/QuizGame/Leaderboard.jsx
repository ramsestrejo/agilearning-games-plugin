import React from 'react';
// File not yet made
// import './Leaderboard.css';

const Leaderboard = ({ score, resetGame }) => {
     // temporary data until connection to backend
     const leaderboardData = [
       { playerName: 'Player 1', score: 55 },
       { playerName: 'Player 2', score: 45 },
       { playerName: 'Player 3', score: 40 },
       { playerName: 'Player 4', score: 30 },
       { playerName: 'Player 5', score: 25 },
       { playerName: 'Player 6', score: 15 },
       { playerName: 'Player 7', score: 10 },
     ];

     return (
          <div className="leaderboard">
            <h1>Leaderboard</h1>
            <ul>
              {leaderboardData.map((entry, index) => (
                <li key={index}>
                  {entry.playerName}: {entry.score}
                </li>
              ))}
            </ul>
            <button onClick={resetGame} className="restart-button">Retry Quiz</button>
            {/* Include button option to return to main menu */}
          </div>
        );
      };
      
      export default Leaderboard;