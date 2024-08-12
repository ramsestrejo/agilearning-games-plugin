import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen.jsx";
import JoinGameScreen from "./components/JoinGameScreen.jsx";
import CreateGameScreen from "./components/CreateGameScreen.jsx";
import QuizForm from "./components/QuizGame/QuizForm.jsx";
import StoryForm from "./components/StoryGame/StoryForm.jsx";
import QuizGame from "./components/QuizGame/QuizGame.jsx";
import StoryGame from "./components/StoryGame/StoryGame.jsx";
import Leaderboard from "./components/QuizGame/Leaderboard.jsx";
import CreationSuccessPage from "./components/CreationSuccessPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/join-game" element={<JoinGameScreen />} />
        <Route path="/create-game" element={<CreateGameScreen />} />
        <Route path="/create-game/quiz" element={<QuizForm />} />
        <Route path="/quiz-game/:id" element={<QuizGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-game/story" element={<StoryForm />} />
        <Route path="/story-game/:id" element={<StoryGame />} />
        <Route path="/creation-success" element={<CreationSuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
