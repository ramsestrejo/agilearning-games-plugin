import React from "react";
import { useHookstate } from "@hookstate/core";
import "./JoinGameScreen.css";
import { useNavigate } from "react-router-dom";

const JoinGameScreen = () => {
  const navigate = useNavigate();
  const [username, setDisplayName] = React.useState("");
  const [gameId, setGameId] = React.useState("");

  const handleJoin = () => {
    // placeholder logic for joining a game
    // console.log(`Join a game using a code: ${gameCode.get()} and username: ${username}`);
    navigate(`/quiz-game/${gameId}`);
  };

  return (
    <div className="join-game-screen">
      <div className="join-game-card">
        <h1>Join a Game</h1>
        <div className="join-form">
          {/* <input
                         type="text"
                         placeholder="Enter a Game Code"
                         value={gameCode.get()}
                         onChange={(e) => gameCode.set(e.target.value)}
                    /> */}
          <input
            type="text"
            placeholder="Enter a Display Name"
            value={username}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter game id"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
          <button disabled={!gameId} onClick={handleJoin}>
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGameScreen;
