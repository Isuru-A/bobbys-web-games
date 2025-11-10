import React, { useState } from 'react';
import { GameState } from './constants';
import Sidebar from './components/Layout/Sidebar';
import GameContainer from './components/Game/GameContainer';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(GameState.HOME);

  return (
    <div className="app-container">
      <Sidebar gameState={gameState} />
      <main className="main-content">
        <GameContainer gameState={gameState} setGameState={setGameState} />
      </main>
    </div>
  );
}

export default App;
