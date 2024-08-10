import React from "react";
import "./Leaderboard.css";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const Leaderboard = ({ score, resetGame }) => {
  const navigate = useNavigate();
  // temporary data until connection to backend
  const leaderboardData = [
    { playerName: "Player 1", score: 80 },
    { playerName: "Player 2", score: 130 },
    { playerName: "Player 3", score: 40 },
    { playerName: "Player 4", score: 30 },
    { playerName: "Player 5", score: 10 },
    { playerName: "Player 6", score: 20 },
    { playerName: "Player 7", score: 40 },
  ];

  const sortedLeaderboardData = [...leaderboardData].sort(
    (a, b) => b.score - a.score
  );

  const topThree = sortedLeaderboardData.slice(0, 3);
  const remainingScores = sortedLeaderboardData.slice(3);

  const handleReturnToMenu = () => {
    navigate("/");
  };

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <IconContext.Provider value={{ size: "2em" }}>
        <div className="top-scores">
          <div className="top-score-left">
            <FaStar style={{ color: "#ffdf5f", fontSize: "1.5em" }} />
            <h2>{topThree[1]?.playerName}</h2>
            <p>{topThree[1]?.score}</p>
          </div>
          <div className="top-score-center">
            <FaStar style={{ color: "#fd3d7b", fontSize: "2em" }} />
            <h2>{topThree[0]?.playerName}</h2>
            <p>{topThree[0]?.score}</p>
          </div>
          <div className="top-score-right">
            <FaStar style={{ color: "#ffdf5f", fontSize: "1.5em" }} />
            <h2>{topThree[2]?.playerName}</h2>
            <p>{topThree[2]?.score}</p>
          </div>
        </div>
      </IconContext.Provider>
      <ul className="rest-of-scores">
        {remainingScores.map((entry, index) => (
          <li key={index}>
            {entry.playerName}: {entry.score}
          </li>
        ))}
      </ul>
      <button
        onClick={(e) => {
          resetGame?.(e) ?? navigate(-1);
        }}
        className="restart-button"
      >
        Retry Quiz
      </button>
      <button onClick={handleReturnToMenu} className="return-button">
        Main Menu
      </button>
    </div>
  );
};

export default Leaderboard;
