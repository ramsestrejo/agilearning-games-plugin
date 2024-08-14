import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  // for taking users to where they can choose which game to create
  const handleCreateGame = () => {
    navigate("/create-game");
  };

  // takes users to where they can input a code to join a game
  const handleJoinGame = () => {
    navigate("/join-game");
  };

  return (
    <div className="home-screen">
      <h1>AgiLearning Game App</h1>
      <div className="menu">
        <button className="menu-button" onClick={handleCreateGame}>
          Create Game
        </button>
        <button className="menu-button" onClick={handleJoinGame}>
          Join Game
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
