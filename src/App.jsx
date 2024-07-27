import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import JoinGameScreen from './components/JoinGameScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/join-game" element={<JoinGameScreen />} />
      </Routes>
    </Router>
  );
};

export default App;