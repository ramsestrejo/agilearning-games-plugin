import React from 'react';
import { useHookstate } from '@hookstate/core';
import { formState } from '../state/storyFormState';

const StoryText = () => {
  const state = useHookstate(formState);

  return (
    <div>
      <label>
        Story Text:
        <textarea
          value={state.storyText.get()}
          onChange={(e) => state.storyText.set(e.target.value)}
          required
        />
      </label>
    </div>
  );
};

export default StoryText;