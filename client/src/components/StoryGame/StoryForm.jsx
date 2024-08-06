import React from 'react';
import { useHookstate } from '@hookstate/core';
import StoryBlockInput from './StoryBlockInput';
import './StoryForm.css';
import { useNavigate } from 'react-router-dom';

const StoryForm = () => {
    const state = useHookstate({
        storyBlocks: [
            {
                storyText: '',
                question: '',
                answers: [''],
                correctAnswer: ''
            }
        ]
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const storyData = state.get();
        console.log('Story Data:', storyData);
        // logic to submit story data
        // temporarily adding route for the story game from here to test and add styling
        navigate('/story-game');
    };

    const handleAddStoryBlock = () => {
        state.storyBlocks.merge([{
            storyText: '',
            question: '',
            answers: [''],
            correctAnswer: ''
        }]);
    };

    return (
        <form className="story-form" onSubmit={handleSubmit}>
            {state.storyBlocks.map((blockState, index) => (
                <StoryBlockInput key={index} index={index} blockState={blockState} />
            ))}
            <button className="add-story-block-btn" type="button" onClick={handleAddStoryBlock}>Add Story Block</button>
            <button className="submit-story-btn" type="submit">Submit Story</button>
        </form>
    );
};

export default StoryForm;
