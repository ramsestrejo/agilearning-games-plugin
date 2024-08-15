import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
  const navigate = useNavigate();
  const { score } = useParams();
  // store custom message based on score
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCustomMessage = async () => {
      // const response = await fetch(`/api/custom-messages/for-score/${score}`);
      // const result = await response.json();
      setMessage("Messages to be added");
    };

    fetchCustomMessage();
  }, [score]);

  // navigate back to homescreen
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="result-page">
      <h1>Your Score: {score}</h1>
      {message && <p>{message}</p>}
      <button className="home-button" onClick={handleGoHome}>
        Home
      </button>
    </div>
  );
};

export default ResultPage;
