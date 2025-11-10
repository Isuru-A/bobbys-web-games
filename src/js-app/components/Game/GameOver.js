import React from 'react';
import Grid from './Grid';
import './GameOver.css';

const GameOver = ({
    gameState,
    targetSquares,
    selectedSquares,
    onRetry,
    onExit,
}) => {
    const isWin = gameState === 'WON';
    const title = isWin ? 'You won!' : 'You lost!';

    // Calculate which squares to show as active (green) and incorrect (red)
    let activeSquaresToShow = [];
    let incorrectSquaresToShow = [];

    if (isWin) {
        activeSquaresToShow = targetSquares;
    } else {
        // In loss, show all targets as green (some might be missed)
        // And show incorrect guesses as red
        activeSquaresToShow = targetSquares;
        incorrectSquaresToShow = selectedSquares.filter(
            (selected) =>
                !targetSquares.some(
                    (target) => target.x === selected.x && target.y === selected.y
                )
        );
    }

    return (
        <div className="game-over">
            <h3 className="game-over-title">
                Game over<br />
                {title}
            </h3>
            <Grid
                activeSquares={activeSquaresToShow}
                incorrectSquares={incorrectSquaresToShow}
            />
            <div className="game-over-buttons">
                <button className="retry-button" onClick={onRetry}>
                    Retry
                </button>
                <button className="exit-button" onClick={onExit}>
                    Exit
                </button>
            </div>
        </div>
    );
};

export default GameOver;
