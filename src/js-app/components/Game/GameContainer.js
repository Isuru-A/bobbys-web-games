import React, { useState, useEffect, useCallback } from 'react';
import { GameState } from '../../constants';
import GameHome from './GameHome';
import GameMemorise from './GameMemorise';
import GameGuess from './GameGuess';
import GameOver from './GameOver';

const GRID_SIZE = 5;
const MEMORISE_TIME = 3; // Seconds to show squares
const GUESS_TIME = 20; // Seconds to guess
const NUM_TARGETS = 6; // Number of squares to remember (adjust based on difficulty if needed)

const generateTargetSquares = () => {
    const squares = [];
    while (squares.length < NUM_TARGETS) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        if (!squares.some((sq) => sq.x === x && sq.y === y)) {
            squares.push({ x, y });
        }
    }
    return squares;
};

const GameContainer = ({ gameState, setGameState }) => {
    const [targetSquares, setTargetSquares] = useState([]);
    const [selectedSquares, setSelectedSquares] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);

    const startGame = useCallback(() => {
        setTargetSquares(generateTargetSquares());
        setSelectedSquares([]);
        setGameState(GameState.MEMORISE);
        setTimeLeft(MEMORISE_TIME);
    }, [setGameState]);

    const handleSquareClick = (x, y) => {
        if (gameState !== GameState.GUESS) return;

        const isAlreadySelected = selectedSquares.some((sq) => sq.x === x && sq.y === y);
        if (isAlreadySelected) return;

        const newSelected = [...selectedSquares, { x, y }];
        setSelectedSquares(newSelected);

        const isCorrect = targetSquares.some((sq) => sq.x === x && sq.y === y);
        if (!isCorrect) {
            setGameState(GameState.LOST);
            return;
        }

        if (newSelected.length === targetSquares.length) {
            setGameState(GameState.WON);
        }
    };

    useEffect(() => {
        let timer;
        if ((gameState === GameState.MEMORISE || gameState === GameState.GUESS) && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            if (gameState === GameState.MEMORISE) {
                setGameState(GameState.GUESS);
                setTimeLeft(GUESS_TIME);
            } else if (gameState === GameState.GUESS) {
                setGameState(GameState.LOST);
            }
        }
        return () => clearTimeout(timer);
    }, [gameState, timeLeft, setGameState]);

    return (
        <div className="game-container">
            {gameState === GameState.HOME && <GameHome onStart={startGame} />}
            {gameState === GameState.MEMORISE && (
                <GameMemorise activeSquares={targetSquares} timeLeft={timeLeft} />
            )}
            {gameState === GameState.GUESS && (
                <GameGuess
                    selectedSquares={selectedSquares}
                    onSquareClick={handleSquareClick}
                    timeLeft={timeLeft}
                />
            )}
            {(gameState === GameState.WON || gameState === GameState.LOST) && (
                <GameOver
                    gameState={gameState}
                    targetSquares={targetSquares}
                    selectedSquares={selectedSquares}
                    onRetry={startGame}
                    onExit={() => setGameState(GameState.HOME)}
                />
            )}
        </div>
    );
};

export default GameContainer;
