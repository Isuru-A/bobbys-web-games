import { GameState } from '../../../constants';
import type { SquareCoord } from '../../../constants';
import MemoryGameGrid from './MemoryGameGrid';
import '../../../css/memory-game/MemoryGameOver.css';

type GameOverProps = {
  gameState: GameState;
  targetSquares: SquareCoord[];
  selectedSquares: SquareCoord[];
  onRetry: () => void;
  onExit: () => void;
};

const MemoryGameOver = ({
  gameState,
  targetSquares,
  selectedSquares,
  onRetry,
  onExit,
}: GameOverProps) => {
  const isWin = gameState === GameState.WON;
  const incorrectSquares = isWin
    ? []
    : selectedSquares.filter(
        (selected) =>
          !targetSquares.some(
            (target) => target.x === selected.x && target.y === selected.y,
          ),
      );

  return (
    <div className="game-over">
      <h3 className="game-over-title">
        Game over
        <br />
        {isWin ? 'You won!' : 'You lost!'}
      </h3>
      <MemoryGameGrid
        activeSquares={targetSquares}
        incorrectSquares={incorrectSquares}
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

export default MemoryGameOver;
