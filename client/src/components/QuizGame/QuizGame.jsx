import React, { useState, useEffect, useCallback } from "react";
import { useHookstate } from "@hookstate/core";
import "./QuizGame.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const QuizGame = () => {
  // get quiz id
  const { id } = useParams();
  const navigate = useNavigate();

  // local state for start time
  const [timer, setTimer] = useState(30);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // state for quiz data
  const state = useHookstate({
    currentQuestionIndex: 0,
    selectedAnswer: "",
    isSubmitted: false,
    score: 0,
    quizData: [],
  });

  useEffect(() => {
    console.log("loading quiz data...");
    const loadQuizData = async () => {
      const quizPages = await fetch(`/api/quiz-pages/quiz/${id}`).then(
        async (res) => await res.json()
      );
      const quizAnswers = await fetch(`/api/quiz-answers/quiz/${id}`).then(
        async (res) => await res.json()
      );

      console.log(quizPages);
      console.log(quizAnswers);

      state.quizData.set(
        quizPages.map(({ question, pageNumber }) => {
          const pageAnswers = quizAnswers.filter(
            ({ quizPage }) => quizPage === pageNumber
          );

          return {
            questionText: question,
            answers: pageAnswers.map(({ answerText }) => answerText),
            correctAnswer: pageAnswers.find(({ isCorrect }) => isCorrect)
              ?.answerText,
          };
        })
      );
    };

    loadQuizData();
  }, []);

  useEffect(() => {
    const currentQuestionIndex = state.currentQuestionIndex.get();
    state.selectedAnswer.set("");
    state.isSubmitted.set(false);

    // reset timer
    setTimer(30);
    setQuestionStartTime(Date.now());

    const timerId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleTimerExpire();
          clearInterval(timerId);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [state.currentQuestionIndex.get()]);

  const currentQuestion =
    state.quizData.get()[state.currentQuestionIndex.get()];
  const isCorrect =
    state.selectedAnswer.get() === currentQuestion?.correctAnswer;

  // moves to next question or goes to leaderboard
  const handleNextAction = useCallback(() => {
    setTimeout(() => {
      const nextIndex = state.currentQuestionIndex.get() + 1;
      if (nextIndex < state.quizData.get().length) {
        state.currentQuestionIndex.set(nextIndex);
      } else {
        fetch("/api/quiz-scores/", {
          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify([
            {
              username: localStorage.getItem("agilearning-username"),
              points: state.score.get(),
              quizId: id,
            },
          ]),

          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(() => {
          navigate(`/leaderboard/${id}`, {
            state: { score: state.score.get() },
          });
        });
      }
      state.isSubmitted.set(false);
    }, 2000);
  }, [state]);

  const handleAnswerClick = useCallback(
    (answer) => {
      if (!state.isSubmitted.get()) {
        state.selectedAnswer.set(answer);
        state.isSubmitted.set(true);

        let bonusScore = 0;
        if (answer === currentQuestion.correctAnswer) {
          const timeLeft = timer;
          bonusScore = Math.max(0, timeLeft * 10);
          state.score.set(state.score.get() + bonusScore);
        }

        handleNextAction();
      }
    },
    [state, currentQuestion, handleNextAction]
  );

  const handleTimerExpire = useCallback(() => {
    if (!state.isSubmitted.get()) {
      state.selectedAnswer.set("");
      state.isSubmitted.set(true);

      handleNextAction();
    }
  }, [state, handleNextAction]);

  return (
    <div className="quiz-game">
      <div className="quizgame-form">
        <div className="question-timer-wrapper">
          <div className="question-section">
            <h2>{currentQuestion?.questionText}</h2>
          </div>
          <div className="timer-section">
            <h3>{timer}</h3>
          </div>
        </div>
        <div className="answers-section">
          <div className="answers-grid">
            {currentQuestion?.answers.map((answer, index) => {
              const isSelected = state.selectedAnswer.get() === answer;
              return (
                <button
                  key={index}
                  className={`answer-button ${
                    isSelected
                      ? state.isSubmitted.get()
                        ? isCorrect
                          ? "correct"
                          : "incorrect"
                        : "selected"
                      : ""
                  }`}
                  onClick={() => handleAnswerClick(answer)}
                  type="button"
                  disabled={state.isSubmitted.get()}
                >
                  {answer}
                </button>
              );
            })}
          </div>
          <div className="score-section">
            <h3>Score: {state.score.get()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
