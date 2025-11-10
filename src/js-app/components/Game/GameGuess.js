import React from 'react';
import Grid from './Grid';
import './GameGuess.css';

const GameGuess = ({ selectedSquares, onSquareClick, timeLeft }) => {
    return (
        <div className="game-guess">
            <h3 className="instruction-text">
                Click on the location of<br />
                the <span className="highlight">green</span> squares
            </h3>
            <Grid
                selectedSquares={selectedSquares}
                onSquareClick={onSquareClick}
                interactive={true}
            />
            <div className="timer">{timeLeft}s</div>
        </div>
    );
};

export default GameGuess;
