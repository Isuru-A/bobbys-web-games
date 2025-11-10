import React from 'react';
import './Grid.css';

const Grid = ({
    activeSquares = [],
    selectedSquares = [],
    incorrectSquares = [],
    onSquareClick,
    interactive = false,
}) => {
    const gridSize = 5;
    const squares = [];

    for (let i = 0; i < gridSize * gridSize; i++) {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);
        const isTarget = activeSquares.some((sq) => sq.x === x && sq.y === y);
        const isSelected = selectedSquares.some((sq) => sq.x === x && sq.y === y);
        const isIncorrect = incorrectSquares.some((sq) => sq.x === x && sq.y === y);

        let className = 'grid-square';
        if (isTarget) className += ' target'; // Green for memorise phase or correct guesses in win/loss
        if (isSelected) className += ' selected'; // Green for user selection during guess phase
        if (isIncorrect) className += ' incorrect'; // Red for wrong guesses in loss screen

        squares.push(
            <div
                key={i}
                className={className}
                onClick={() => interactive && onSquareClick && onSquareClick(x, y)}
            />
        );
    }

    return <div className="grid-container">{squares}</div>;
};

export default Grid;
