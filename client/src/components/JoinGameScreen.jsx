import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./JoinGameScreen.css";
import { useNavigate } from "react-router-dom";

const JoinGameScreen = () => {
  const navigate = useNavigate();
  const [username, setDisplayName] = React.useState(
    localStorage.getItem("agilearning-username") ?? ""
  );
  const [gameId, setGameId] = React.useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const apiController = useMemo(() => {
    switch (selectedGame) {
      case "quiz":
        return "quizzes";
      case "story":
        return "stories";
      default:
        return "";
    }
  }, [selectedGame]);

  // joins a game based on the game type and id
  const handleJoin = useCallback(() => {
    localStorage.setItem("agilearning-username", username);
    setErrorMessage("");

    fetch(`/api/${apiController}/${gameId}`)
      .then((response) => {
        if (response.status === 404) {
          setErrorMessage("Game Id does not exist");
          return;
        }
        navigate(`/${selectedGame}-game/${gameId}`);
      })
      .catch(() => setErrorMessage("Something went wrong"));
  }, [username, gameId, selectedGame, apiController]);

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
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="">Select a Game</option>
            {games
              .filter((name) => ["quiz", "story"].includes(name))
              .map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="Enter game id"
            value={gameId}
            onChange={(e) => {
              setGameId(e.target.value);
            }}
          />
          <button
            disabled={!gameId || !username || !selectedGame}
            onClick={handleJoin}
          >
            Join Game
          </button>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default JoinGameScreen;
