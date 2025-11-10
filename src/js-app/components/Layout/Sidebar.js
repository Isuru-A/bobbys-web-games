import React from 'react';
import { GameState } from '../../constants';
import './Sidebar.css';

const Sidebar = ({ gameState }) => {
  const games = [
    'Simon Says',
    'Memory Game',
    'Connect Four',
    'Spot The Difference',
    'Tic Tac Toe',
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Bobby’s Web Games</h2>
        {gameState !== GameState.HOME && (
          <span className="sidebar-subtitle">Memory Game</span>
        )}
      </div>
      {gameState === GameState.HOME && (
        <ul className="game-list">
          {games.map((game) => (
            <li
              key={game}
              className={`game-item ${game === 'Memory Game' ? 'active' : ''}`}
            >
              {game}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
