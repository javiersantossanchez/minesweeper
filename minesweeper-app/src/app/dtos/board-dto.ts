import { Square } from '../entities/square';

export interface BoardDto {
  gameBoard: Array<Array<Square>>;

  gameBoardLength: number;

  availableMarks: number;

  installedMines: number;

}
