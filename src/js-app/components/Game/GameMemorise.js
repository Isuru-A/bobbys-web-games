import React from 'react';
import Grid from './Grid';
import './GameMemorise.css';

const GameMemorise = ({ activeSquares, timeLeft }) => {
    return (
        <div className="game-memorise">
            <h3 className="instruction-text">
                Memorise the location of<br />
                the <span className="highlight">green</span> squares
            </h3>
            <Grid activeSquares={activeSquares} />
            <div className="timer">{timeLeft}s</div>
        </div>
    );
};

export default GameMemorise;
