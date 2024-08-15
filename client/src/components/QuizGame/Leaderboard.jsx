import React, { useMemo, useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";
import "./Leaderboard.css";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useParams, useNavigate } from "react-router-dom";

// fetch score data from database
// place score data into ui

// component displays the top scores, followed by the lower scores
// users can then retry the quiz or go to the homescreen
const Leaderboard = ({ resetGame }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizScores, setQuizScores] = useState([]);

  useEffect(() => {
    const loadQuizScoreData = async () => {
      // Fetch quiz score data from the endpoint
      const quizScores = await fetch(`/api/quiz-scores/${id}`).then(
        async (res) => await res.json()
      );

      // process the quiz score data
      const quizScoreData = quizScores.map(({ username, points, quiz_id }) => {
        return {
          username,
          points,
          quizId: quiz_id,
        };
      });

      setQuizScores(quizScoreData);
    };

    // Data is loaded only when necessary
    loadQuizScoreData();
  }, []);

  const topThree = useMemo(() => quizScores.slice(0, 3), [quizScores]);
  const remainingScores = useMemo(() => quizScores.slice(3), [quizScores]);

  // handle returning to the homescreen
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
            <h2>{topThree[1]?.username}</h2>
            <p>{topThree[1]?.points}</p>
          </div>
          <div className="top-score-center">
            <FaStar style={{ color: "#fd3d7b", fontSize: "2em" }} />
            <h2>{topThree[0]?.username}</h2>
            <p>{topThree[0]?.points}</p>
          </div>
          <div className="top-score-right">
            <FaStar style={{ color: "#ffdf5f", fontSize: "1.5em" }} />
            <h2>{topThree[2]?.username}</h2>
            <p>{topThree[2]?.points}</p>
          </div>
        </div>
      </IconContext.Provider>
      <ul className="rest-of-scores">
        {remainingScores.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.points}
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
