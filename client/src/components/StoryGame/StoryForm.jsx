import React from "react";
import { useHookstate } from "@hookstate/core";
import StoryBlockInput from "./StoryBlockInput";
import "./StoryForm.css";
import { createSearchParams, useNavigate } from "react-router-dom";

const StoryForm = () => {
  const state = useHookstate({
    storyBlocks: [
      {
        storyText: "",
        question: "",
        answers: [""],
        correctAnswer: "",
      },
    ],
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { storyBlocks } = state.get();

    const newStory = await fetch("/api/stories", {
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

    const { id } = await newStory.json();

    console.log(storyBlocks);

    const newStoryPages = await fetch("/api/story-pages", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify(
        storyBlocks.map(({ question, storyText }, index) => ({
          storyId: id,
          pageNumber: index + 1,
          content: storyText,
          question: question,
        }))
      ),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const newStoryPagesJson = await newStoryPages.json();

    const newStoryAnswers = await fetch("/api/story-answers", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send

      body: JSON.stringify(
        storyBlocks.flatMap(({ answers, correctAnswer }, index) =>
          answers.map((answer) => ({
            storyPage: newStoryPagesJson[index].pageNumber,
            storyId: id,
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

    const newStoryAnswersJson = await newStoryAnswers.json();

    // console.log("Story Data:", storyBlocks);
    // logic to submit story data

    navigate(
      `/creation-success/${id}?${createSearchParams({
        type: "story",
      })}`
    );
  };

  const handleAddStoryBlock = () => {
    state.storyBlocks.merge([
      {
        storyText: "",
        question: "",
        answers: [""],
        correctAnswer: "",
      },
    ]);
  };

  return (
    <form className="story-form" onSubmit={handleSubmit}>
      {state.storyBlocks.map((blockState, index) => (
        <StoryBlockInput key={index} index={index} blockState={blockState} />
      ))}
      <button
        className="add-story-block-btn"
        type="button"
        onClick={handleAddStoryBlock}
      >
        Add Story Block
      </button>
      <button className="submit-story-btn" type="submit">
        Submit Story
      </button>
    </form>
  );
};

export default StoryForm;
