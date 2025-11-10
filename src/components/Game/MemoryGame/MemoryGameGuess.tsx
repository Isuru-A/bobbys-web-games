import type { SquareCoord } from '../../../constants';
import MemoryGameGrid from './MemoryGameGrid';
import '../../../css/memory-game/MemoryGameGuess.css';

type GameGuessProps = {
  selectedSquares: SquareCoord[];
  onSquareClick: (x: number, y: number) => void;
  timeLeft: number;
};

const MemoryGameGuess = ({
  selectedSquares,
  onSquareClick,
  timeLeft,
}: GameGuessProps) => (
  <div className="game-guess">
    <h3 className="instruction-text">
      Click on the location of
      <br />
      the <span className="highlight">green</span> squares
    </h3>
    <MemoryGameGrid
      selectedSquares={selectedSquares}
      onSquareClick={onSquareClick}
      interactive
    />
    <div className="timer">{timeLeft}s</div>
  </div>
);

export default MemoryGameGuess;
