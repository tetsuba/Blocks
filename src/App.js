import React from 'react';
import './App.css';

// Components
import Scoreboard from './components/containers/Scoreboard/Scoreboard';
import GameTimer from './components/containers/GameTimer/GameTimer';
import BlocksBoard from './components/containers/BlocksBoard/BlocksBoard';

function App() {
  return (
    <div className="App">
      <div className="game-container">
        <Scoreboard />
        <GameTimer />
        <BlocksBoard />
      </div>
    </div>
  );
}

export default App;
