
import { BoardGameService } from 'src/app/services/def/board-game.service';
import { Square ,STATUS} from 'src/app/entities/square';
import { Observable, of } from 'rxjs';


export class BoardGame implements BoardGameService {

  generateBoard(): Observable<Array<Array<Square>>> {
    const board: Array<Array<Square>> = new Array<Array<Square>>();
    let sequence = 1;

    for (let row = 0; row < this.getBoardSize(); row++) {
      board[row] = new Array<Square>();
      for (let column = 0; column < this.getBoardSize(); column++) {
        sequence++;
        const squareTmp: Square = new Square(sequence, row, column);
        board[row].push(squareTmp);
      }
    }
    const boardToReturn: Array<Array<Square>> = this.calculateNumOfMinesAround(this.installMines(board));

    return of(boardToReturn);
  }

  private installMines(board: Array<Array<Square>>): Array<Array<Square>> {
    for (let i = 1; i <= this.getNumberOfMines(); ) {
      const row = Math.floor(Math.random() * Math.floor(this.getBoardSize()));
      const column = Math.floor(Math.random() * Math.floor(this.getBoardSize()));
      if (!board[row][column].isMine()) {
        board[row][column].installMine();
        i++;
      }
    }
    return board;
  }

  private calculateNumOfMinesAround(board: Array<Array<Square>>): Array<Array<Square>> {
    for (let row = 0; row < this.getBoardSize(); row++) {
      for (let column = 0; column < this.getBoardSize(); column++) {
          let numOfMines = 0;
          if ( (row >= 1) && board[row - 1][column].isMine()) {
              numOfMines++;
          }

          if ( (row < this.getBoardSize() - 1) && board[row + 1][column].isMine()) {
              numOfMines++;
          }

          if ( (column >= 1) && board[row][column - 1].isMine()) {
            numOfMines++;
          }

          if ( (column < this.getBoardSize() - 1) && board[row][column + 1].isMine()) {
            numOfMines++;
          }

          if ( (row >= 1) && (column >= 1) && board[row - 1][column - 1].isMine()) {
            numOfMines++;
          }

          if ( (row < this.getBoardSize() - 1) && (column < this.getBoardSize() - 1) && board[row + 1][column + 1].isMine()) {
            numOfMines++;
          }

          if ( (row >= 1) && (column < this.getBoardSize() - 1) && board[row - 1][column + 1].isMine()) {
            numOfMines++;
          }

          if ( (row < this.getBoardSize() - 1) && (column >= 1) && board[row + 1][column - 1].isMine()) {
            numOfMines++;
          }
          board[row][column].setNumberOfMinesAround(numOfMines);
      }
    }
    return board;
  }

  revealsNumberOfNeighborWithMine(board: Array<Array<Square>>, selectedSquare: Square): Array<Array<Square>> {
    const row: number = selectedSquare.getRowIndex();
    const column: number = selectedSquare.getColumnIndex();

    board[row][column].push();
    if (board[row][column].getNumberOfMineAround() === 0) {
       if (row >= 1 && board[row - 1][column].isClosed()) {
        this.revealsNumberOfNeighborWithMine(board,  board[row - 1][column]);
       }

       if (row < this.getBoardSize() - 1 && board[row + 1][column].isClosed()) {
        this.revealsNumberOfNeighborWithMine(board, board[row + 1][column]);
       }

       if (column >= 1 && board[row ][column - 1].isClosed()) {
        this.revealsNumberOfNeighborWithMine(board, board[row][column - 1]);
       }

       if (column < this.getBoardSize() - 1 && board[row][column + 1].isClosed()) {
        this.revealsNumberOfNeighborWithMine(board, board[row][column + 1]);
       }

       if ((row >= 1) && (column >= 1) && board[row - 1][column - 1].isClosed()) {
        this.revealsNumberOfNeighborWithMine(board, board[row - 1][column - 1]);
       }

       if ((row < this.getBoardSize() - 1) && (column < this.getBoardSize() - 1) && board[row + 1][column + 1].isClosed()) {
        this.revealsNumberOfNeighborWithMine(board, board[row + 1][column + 1]);
       }

       if ((row >= 1) && (column < this.getBoardSize() - 1) && board[row - 1][column + 1].isClosed()) {
        this.revealsNumberOfNeighborWithMine(board, board[row - 1][column + 1]);
      }

       if ((row < this.getBoardSize() - 1) && (column >= 1) && board[row + 1][column - 1].isClosed()) {
        this.revealsNumberOfNeighborWithMine(board, board[row + 1][column - 1]);
      }
    }
    return board;
  }

  getBoardSize(): number {
    return 6;
  }

  getNumberOfMines(): number {
    return 5;
  }



}
