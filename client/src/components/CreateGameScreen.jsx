import React, { useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";
import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard";
import "./CreateGameScreen.css";

const CreateGameScreen = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/games")
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  // navigates to game creation form based on the type of game
  const handleCreateGame = (gameName) => {
    navigate(`/create-game/${gameName.toLowerCase()}`);
  };

  const handleDotClick = (index) => {
    setCurrentPage(index);
  };

  const handleArrowClick = (direction) => {
    const totalPages = Math.ceil(games.length / 2);
    let newPage = currentPage + (direction === "left" ? -1 : 1);

    if (newPage < 0) newPage = totalPages - 1;
    if (newPage >= totalPages) newPage = 0;

    setCurrentPage(newPage);
  };

  const cardsPerPage = 2;
  const totalPages = Math.ceil(games.length / cardsPerPage);

  return (
    <div className="create-game-screen">
      <h1>Choose a type of game to create</h1>
      <div className="carousel-container">
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{
              transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
              width: `${totalPages * 100}%`,
            }}
          >
            {games?.map((game) => (
              <GameCard
                key={game.name}
                game={game}
                onCreateGame={handleCreateGame}
                isDisabled={!["quiz", "story"].includes(game.name)}
              />
            ))}
          </div>
        </div>
        <div className="pagination-container">
          <div
            className="arrow arrow-left"
            onClick={() => handleArrowClick("left")}
          />
          <div className="pagination">
            {[...Array(totalPages).keys()].map((index) => (
              <div
                key={index}
                className={`pagination-dot ${
                  currentPage === index ? "active" : ""
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
          <div
            className="arrow arrow-right"
            onClick={() => handleArrowClick("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateGameScreen;
