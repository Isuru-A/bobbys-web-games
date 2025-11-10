export const GameState = {
  HOME: 'HOME',
  MEMORISE: 'MEMORISE',
  GUESS: 'GUESS',
  WON: 'WON',
  LOST: 'LOST',
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];

export type SquareCoord = {
  x: number;
  y: number;
};
