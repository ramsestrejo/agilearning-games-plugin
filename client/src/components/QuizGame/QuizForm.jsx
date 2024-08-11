import React from "react";
import { useHookstate } from "@hookstate/core";
import QuizBlockInput from "./QuizBlockInput";
import "./QuizForm.css";
import { useNavigate } from "react-router-dom";

const generateGameCode = () => {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
};

const QuizForm = () => {
  const state = useHookstate({
    questions: [
      {
        questionText: "",
        answers: [""],
        correctAnswer: "",
      },
    ],
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { questions } = state.get();

    const gameCode = generateGameCode();

    // TO DO: IMPLEMENT WITH API >>>
    // navigate("/creation-success", { state: { gameCode } });

    const newQuiz = await fetch("/api/quizzes", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        gameType: 1,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const { id } = await newQuiz.json();

    const newQuizPages = await fetch("/api/quiz-pages", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify(
        questions.map(({ questionText }, index) => ({
          quizId: id,
          pageNumber: index + 1,
          question: questionText,
        }))
      ),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const newQuizPagesJson = await newQuizPages.json();

    const newQuizAnswers = await fetch("/api/quiz-answers", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send

      body: JSON.stringify(
        questions.flatMap(({ answers, correctAnswer }, index) =>
          answers.map((answer) => ({
            quizPage: newQuizPagesJson[index].pageNumber,
            quizId: id,
            answerText: answer,
            isCorrect: answer === correctAnswer,
          }))
        )
      ),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const newQuizAnswersJson = await newQuizAnswers.json();

    navigate(`/quiz-game/${id}`);
  };

  const handleAddQuestion = () => {
    state.questions.merge([
      {
        questionText: "",
        answers: [""],
        correctAnswer: "",
      },
    ]);
  };

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      {state.questions.map((questionState, index) => (
        <QuizBlockInput key={index} index={index} blockState={questionState} />
      ))}
      <button
        className="add-question-btn"
        type="button"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      <button className="submit-quiz-btn" type="submit">
        Submit Quiz
      </button>
    </form>
  );
};

export default QuizForm;
