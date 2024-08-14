import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
     const navigate = useNavigate();
  const { score } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCustomMessage = async () => {
      const response = await fetch(`/api/custom-messages/for-score/${score}`);
      const result = await response.json();
      setMessage(result.message);
    };

    fetchCustomMessage();
  }, [score]);

  const handleGoHome = () => {
     navigate("/");
   };

  return (
    <div className="result-page">
      <h1>Your Score: {score}</h1>
      {message && <p>{message}</p>}
      <button className="home-button" onClick={handleGoHome}>Home</button>
    </div>
  );
};

export default ResultPage;