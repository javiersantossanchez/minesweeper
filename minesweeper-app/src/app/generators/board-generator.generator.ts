import { Square } from '../entities/square';

export class BoardGenerator {

  installMines(board: Array<Array<Square>>, numberOfMineToInstall: number): Array<Array<Square>> {
    if ((numberOfMineToInstall > board.length * board.length) || (numberOfMineToInstall < 0 )) {
      return null;
    }
    for (let i = 1; i <= numberOfMineToInstall; ) {
      const row = Math.floor(Math.random() * Math.floor(board.length));
      const column = Math.floor(Math.random() * Math.floor(board.length));
      if (!board[row][column].isMine()) {
        board[row][column].installMine();
        i++;
      }
    }
    return board;
  }

}
