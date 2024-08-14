import React, { useState, useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import "./StoryGame.css";
import { useNavigate, useParams } from "react-router-dom";

const StoryGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const state = useHookstate({
    currentSegmentIndex: 0,
    selectedAnswer: "",
    isSubmitted: false,
    view: "story",
    storyData: [],
    score: 0,
    customMessages: [],
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
      const customMessages = await fetch(`/api/custom-messages/story/${id}`).then(res => res.json());

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
      state.customMessages.set(customMessages);
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

  const currentSegmentIndex = state.currentSegmentIndex.get();
  const storyData = state.storyData.get();
  const totalPages = storyData.length;
  const currentSegment = state.storyData.get()[state.currentSegmentIndex.get()];
  const isCorrect = state.selectedAnswer.get() === currentSegment.correctAnswer;

  const handleAnswerClick = (answer) => {
    if (!state.isSubmitted.get() && state.view.get() === "question") {
      state.selectedAnswer.set(answer);
      state.isSubmitted.set(true);

      if (isCorrect) {
        state.score.set(state.score.get() + 1);
      }

      setTimeout(() => {
        const nextIndex = state.currentSegmentIndex.get() + 1;
        if (nextIndex < totalPages) {
          state.currentSegmentIndex.set(nextIndex);
          state.view.set("story");
        } else {
          navigate(`/result/${state.score.get()}`);
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
            <div className="page-count">
              Page {currentSegmentIndex + 1} / {totalPages}
            </div>
            <button
              type="button"
              className="storycontinue-button"
              onClick={handleContinue}
            >
              <span className="storyarrow"></span>
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
