import { Square } from '../entities/square';


export enum GAME_STATUS {
  LOSE,
  WIN,
  PLAYING,
}

export interface GameState {

  gameBoard: Array<Array<Square>>;

  gameBoardLength: number;

  availableMarks: number;

  installedMines: number;

  gameStatus: GAME_STATUS;

  numberOfOpenMines: number;
}
