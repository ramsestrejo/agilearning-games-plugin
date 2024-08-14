import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResultPage = () => {
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

  return (
    <div className="result-page">
      <h1>Your Score: {score}</h1>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResultPage;