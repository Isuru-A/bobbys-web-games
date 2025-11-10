import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../../../constants';
import type { SquareCoord } from '../../../constants';
import MemoryGameHome from './MemoryGameHome';
import MemoryGameMemorise from './MemoryGameMemorise';
import MemoryGameGuess from './MemoryGameGuess';
import MemoryGameOver from './MemoryGameOver';
import { useGameSession } from '../../../context/GameSessionContext';

const GRID_SIZE = 5;
const MEMORISE_TIME = 3;
const GUESS_TIME = 20;
const NUM_TARGETS = 6;

const generateTargetSquares = (): SquareCoord[] => {
  const squares: SquareCoord[] = [];
  while (squares.length < NUM_TARGETS) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    if (!squares.some((sq) => sq.x === x && sq.y === y)) {
      squares.push({ x, y });
    }
  }
  return squares;
};

const MemoryGameContainer = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [targetSquares, setTargetSquares] = useState<SquareCoord[]>([]);
  const [selectedSquares, setSelectedSquares] = useState<SquareCoord[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const { setSession } = useGameSession();

  const startGame = useCallback(() => {
    setTargetSquares(generateTargetSquares());
    setSelectedSquares([]);
    setGameState(GameState.MEMORISE);
    setTimeLeft(MEMORISE_TIME);
  }, [setGameState]);

  const handleSquareClick = (x: number, y: number) => {
    if (gameState !== GameState.GUESS) return;

    const isAlreadySelected = selectedSquares.some(
      (sq) => sq.x === x && sq.y === y,
    );
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
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (
      (gameState === GameState.MEMORISE || gameState === GameState.GUESS) &&
      timeLeft > 0
    ) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      if (gameState === GameState.MEMORISE) {
        setGameState(GameState.GUESS);
        setTimeLeft(GUESS_TIME);
      } else if (gameState === GameState.GUESS) {
        setGameState(GameState.LOST);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [gameState, timeLeft, setGameState]);

  useEffect(() => {
    if (gameState === GameState.HOME) {
      setSession(false);
    } else {
      setSession(true, 'Memory Game');
    }
  }, [gameState, setSession]);

  useEffect(
    () => () => {
      setSession(false);
    },
    [setSession],
  );

  return (
    <div className="game-container">
      {gameState === GameState.HOME && <MemoryGameHome onStart={startGame} />}
      {gameState === GameState.MEMORISE && (
        <MemoryGameMemorise activeSquares={targetSquares} timeLeft={timeLeft} />
      )}
      {gameState === GameState.GUESS && (
        <MemoryGameGuess
          selectedSquares={selectedSquares}
          onSquareClick={handleSquareClick}
          timeLeft={timeLeft}
        />
      )}
      {(gameState === GameState.WON || gameState === GameState.LOST) && (
        <MemoryGameOver
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

export default MemoryGameContainer;
