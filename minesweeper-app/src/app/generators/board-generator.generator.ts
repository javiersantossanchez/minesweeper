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

  calculateNumOfMinesAround(board: Array<Array<Square>>): Array<Array<Square>> {
    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board.length; column++) {
          let numOfMines = 0;
          if ( (row >= 1) && board[row - 1][column].isMine()) {
              numOfMines++;
          }

          if ( (row < board.length - 1) && board[row + 1][column].isMine()) {
              numOfMines++;
          }

          if ( (column >= 1) && board[row][column - 1].isMine()) {
            numOfMines++;
          }

          if ( (column < board.length - 1) && board[row][column + 1].isMine()) {
            numOfMines++;
          }

          if ( (row >= 1) && (column >= 1) && board[row - 1][column - 1].isMine()) {
            numOfMines++;
          }

          if ( (row < board.length - 1) && (column < board.length - 1) && board[row + 1][column + 1].isMine()) {
            numOfMines++;
          }

          if ( (row >= 1) && (column < board.length - 1) && board[row - 1][column + 1].isMine()) {
            numOfMines++;
          }

          if ( (row < board.length - 1) && (column >= 1) && board[row + 1][column - 1].isMine()) {
            numOfMines++;
          }
          board[row][column].setNumberOfMinesAround(numOfMines);
      }
    }
    return board;
  }

}
