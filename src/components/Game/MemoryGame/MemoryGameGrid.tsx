import type { SquareCoord } from '../../../constants';
import '../../../css/memory-game/MemoryGameGrid.css';

type GridProps = {
  activeSquares?: SquareCoord[];
  selectedSquares?: SquareCoord[];
  incorrectSquares?: SquareCoord[];
  onSquareClick?: (x: number, y: number) => void;
  interactive?: boolean;
};

const MemoryGameGrid = ({
  activeSquares = [],
  selectedSquares = [],
  incorrectSquares = [],
  onSquareClick,
  interactive = false,
}: GridProps) => {
  const gridSize = 5;
  const squares = [];

  for (let i = 0; i < gridSize * gridSize; i += 1) {
    const x = i % gridSize;
    const y = Math.floor(i / gridSize);
    const isTarget = activeSquares.some((sq) => sq.x === x && sq.y === y);
    const isSelected = selectedSquares.some((sq) => sq.x === x && sq.y === y);
    const isIncorrect = incorrectSquares.some((sq) => sq.x === x && sq.y === y);

    let className = 'grid-square';
    if (interactive) className += ' interactive';
    if (isTarget) className += ' target';
    if (isSelected) className += ' selected';
    if (isIncorrect) className += ' incorrect';

    squares.push(
      <div
        key={`${x}-${y}`}
        className={className}
        onClick={() => {
          if (interactive && onSquareClick) {
            onSquareClick(x, y);
          }
        }}
      />,
    );
  }

  return <div className="grid-container">{squares}</div>;
};

export default MemoryGameGrid;
