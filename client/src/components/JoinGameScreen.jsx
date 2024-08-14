import React, { useState, useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import "./JoinGameScreen.css";
import { useNavigate } from "react-router-dom";

const JoinGameScreen = () => {
  const navigate = useNavigate();
  const [username, setDisplayName] = React.useState("");
  const [gameId, setGameId] = React.useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(games[0]);

  useEffect(() => {
    fetch("/api/games/:gameName")
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => setGames(data.map(({ game_name }) => game_name)))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  const handleJoin = () => {
    navigate(`/${selectedGame}-game/${gameId}`);
  };

  return (
    <div className="join-game-screen">
      <div className="join-game-card">
        <h1>Join a Game</h1>
        <div className="join-form">
          <input
            type="text"
            placeholder="Enter a Display Name"
            value={username}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <select
            id="GameType"
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            {games.map((game) => (
              <option value={game}>{game}</option>
            ))}
          </select>
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
