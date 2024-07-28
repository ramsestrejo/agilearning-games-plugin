import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from "./components/HomeScreen.jsx";
import JoinGameScreen from './components/JoinGameScreen.jsx';
import CreateGameScreen from './components/CreateGameScreen.jsx';
import Story from './components/Story.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/join-game" element={<JoinGameScreen />} />
        <Route path="/create-game" element={<CreateGameScreen />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Router>
  );
};

export default App;