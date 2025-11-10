import React from 'react';
import Grid from './Grid';
import './GameHome.css';

const GameHome = ({ onStart }) => {
    return (
        <div className="game-home">
            <h2 className="game-title">Memory Game</h2>
            <Grid />
            <div className="game-info">
                <p>Size <strong>5 x 5</strong></p>
                <p>Time limit <strong>20s</strong></p>
            </div>
            <button className="start-button" onClick={onStart}>
                Start
            </button>
        </div>
    );
};

export default GameHome;
