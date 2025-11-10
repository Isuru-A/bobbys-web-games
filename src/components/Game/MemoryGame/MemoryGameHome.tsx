import MemoryGameGrid from './MemoryGameGrid';
import '../../../css/memory-game/MemoryGameHome.css';

type GameHomeProps = {
  onStart: () => void;
};

const MemoryGameHome = ({ onStart }: GameHomeProps) => (
  <div className="game-home">
    <h2 className="game-title">Memory Game</h2>
    <MemoryGameGrid />
    <div className="game-info">
      <p>
        Size <strong>5 x 5</strong>
      </p>
      <p>
        Time limit <strong>20s</strong>
      </p>
    </div>
    <button className="start-button" onClick={onStart}>
      Start
    </button>
  </div>
);

export default MemoryGameHome;
