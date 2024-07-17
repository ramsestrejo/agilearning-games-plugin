import React from 'react';
import { useState } from '@hookstate/core';
import achievementState from '../state/achievementState';

const Achievements = () => {
     const achievements = useState(achievementState);

     const earnAchievement = (id) => {
          const achievement = achievements.find(a => a.id === id);
          if (achievement) {
               achievement.earned.set(true);
          }
     };

     //to be filled out later
     return ("");
};