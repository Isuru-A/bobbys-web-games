import type { SquareCoord } from '../../../constants';
import MemoryGameGrid from './MemoryGameGrid';
import '../../../css/memory-game/MemoryGameMemorise.css';

type GameMemoriseProps = {
  activeSquares: SquareCoord[];
  timeLeft: number;
};

const MemoryGameMemorise = ({
  activeSquares,
  timeLeft,
}: GameMemoriseProps) => (
  <div className="game-memorise">
    <h3 className="instruction-text">
      Memorise the location of
      <br />
      the <span className="highlight">green</span> squares
    </h3>
    <MemoryGameGrid activeSquares={activeSquares} />
    <div className="timer">{timeLeft}s</div>
  </div>
);

export default MemoryGameMemorise;
