import React, { useState } from "react";
import { useHookstate } from "@hookstate/core";
import StoryBlockInput from "./StoryBlockInput";
import "./StoryForm.css";
import { createSearchParams, useNavigate } from "react-router-dom";

const StoryForm = () => {
  const [customMessages, setCustomMessages] = useState([{ threshold: "", message: "" }]);
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

    // post request for creating custom messages
    await fetch("/api/custom-messages", {
      method: "POST",
      body: JSON.stringify({ storyId: id, messages: customMessages }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    // navigation to the success page with id
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

  // adding custom message
  const handleAddCustomMessage = () => {
    setCustomMessages([...customMessages, { threshold: "", message: "" }]);
  };

  // updating custom message
  const handleCustomMessageChange = (index, field, value) => {
    const updatedMessages = [...customMessages];
    updatedMessages[index] = { ...updatedMessages[index], [field]: value };
    setCustomMessages(updatedMessages);
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
      <div className="custom-messages">
        <h3>Custom Messages for Results</h3>
        {customMessages.map((msg, index) => (
          <div key={index} className="custom-message-input">
            <label>
              If Player Receives a Score of:
              <input
                type="number"
                value={msg.threshold}
                onChange={(e) => handleCustomMessageChange(index, "threshold", e.target.value)}
              />
            </label>
            <label>
              Display This Message:
              <input
                type="text"
                value={msg.message}
                onChange={(e) => handleCustomMessageChange(index, "message", e.target.value)}
              />
            </label>
          </div>
        ))}
        <button className="add-custom-message-btn" type="button" onClick={handleAddCustomMessage}>
          Add Custom Message
        </button>
      </div>
      <button className="submit-story-btn" type="submit">
        Submit Story
      </button>
    </form>
  );
};

export default StoryForm;
