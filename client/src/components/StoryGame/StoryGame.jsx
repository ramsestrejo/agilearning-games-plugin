import React, { useState, useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import "./StoryGame.css";
import { useParams } from "react-router-dom";

const StoryGame = () => {
  const { id } = useParams();

  const state = useHookstate({
    currentSegmentIndex: 0,
    selectedAnswer: "",
    isSubmitted: false,
    view: "story",
    storyData: [
      {
        storyText: "Piece of story text 1.",
        questionText: "Question 1?",
        answers: ["Answer 1", "Answer 2"],
        correctAnswer: "Answer 1",
      },
      {
        storyText: "Piece of story text 2.",
        questionText: "Question 2?",
        answers: ["Answer 1", "Answer 2"],
        correctAnswer: "Answer 2",
      },
      {
        storyText: "Piece of story text 3.",
        questionText: "Question 3?",
        answers: ["Yes", "No"],
        correctAnswer: "Yes",
      },
    ],
  });

  //temporary use state
  const [temp, setTemp] = useState(true);

  useEffect(() => {
    const loadStoryData = async () => {
      const storyPages = await fetch(`/api/story-pages/story/${id}`).then(
        async (res) => await res.json()
      );
      const storyAnswers = await fetch(`/api/story-answers/story/${id}`).then(
        async (res) => await res.json()
      );

      state.storyData.set(
        storyPages.map(({ question, pageNumber, content }) => {
          const pageAnswers = storyAnswers.filter(
            ({ storyPage }) => storyPage === pageNumber
          );
          console.log(pageAnswers);

          return {
            questionText: question,
            storyText: content,
            answers: pageAnswers.map(({ answerText }) => answerText),
            correctAnswer: pageAnswers.find(({ isCorrect }) => isCorrect)
              ?.answerText,
          };
        })
      );
    };

    if (temp && state) {
      loadStoryData();
      setTemp(false);
    }
  }, [temp, state]);

  useEffect(() => {
    state.selectedAnswer.set("");
    state.isSubmitted.set(false);
  }, [state.currentSegmentIndex.get()]);

  const currentSegment = state.storyData.get()[state.currentSegmentIndex.get()];
  const isCorrect = state.selectedAnswer.get() === currentSegment.correctAnswer;

  const handleAnswerClick = (answer) => {
    if (!state.isSubmitted.get() && state.view.get() === "question") {
      state.selectedAnswer.set(answer);
      state.isSubmitted.set(true);

      setTimeout(() => {
        const nextIndex = state.currentSegmentIndex.get() + 1;
        if (nextIndex < state.storyData.get().length) {
          state.currentSegmentIndex.set(nextIndex);
          state.view.set("story");
        }
        state.isSubmitted.set(false);
      }, 2000);
    }
  };

  const handleContinue = () => {
    state.view.set("question");
  };

  return (
    <div className="story-game">
      <form className="storygame-form">
        {state.view.get() === "story" ? (
          <div className="story-section">
            <p>{currentSegment.storyText}</p>
            <button
              type="button"
              className="storycontinue-button"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="storyquestion-section">
            <h2>{currentSegment.questionText}</h2>
            <div className="storyanswers-grid">
              {currentSegment.answers.map((answer, index) => {
                const isSelected = state.selectedAnswer.get() === answer;
                return (
                  <button
                    key={index}
                    className={`storyanswer-button ${
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
          </div>
        )}
      </form>
    </div>
  );
};

export default StoryGame;
