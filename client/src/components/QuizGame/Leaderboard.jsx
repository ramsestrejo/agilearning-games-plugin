import React from 'react';
// File not yet made
// import './Leaderboard.css';

const Leaderboard = ({ score, resetGame }) => {
     // temporary data until connection to backend
     const leaderboardData = [
       { playerName: 'Player 1', score: 80 },
       { playerName: 'Player 2', score: 130 },
       { playerName: 'Player 3', score: 40 },
       { playerName: 'Player 4', score: 30 },
       { playerName: 'Player 5', score: 10 },
       { playerName: 'Player 6', score: 20 },
       { playerName: 'Player 7', score: 40 },
     ];

     const sortedLeaderboardData = [...leaderboardData].sort((a, b) => b.score - a.score);

     return (
          <div className="leaderboard">
            <h1>Leaderboard</h1>
            <div className="top-scores">
                {sortedLeaderboardData.slice(0, 3).map((entry, index) => (
                    <div className="top-score" key={index}>
                        <h2>{entry.playerName}</h2>
                        <p>{entry.score}</p>
                    </div>
                ))}
            </div>
            <ul className="rest-of-scores">
                {sortedLeaderboardData.slice(3).map((entry, index) => (
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