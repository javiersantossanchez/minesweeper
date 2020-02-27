import { BoardGame } from './board-game';
import { Square } from 'src/app/entities/square';

describe('BoardGame', () => {
  it('should create an instance', () => {
    expect(new BoardGame()).toBeTruthy();
  });

 /* it('generate board on right way', () => {
    const boardGame: BoardGame = new BoardGame();
    const board: Array<Array<Square>> = boardGame.generateBoard();
    let numOfMines = 0;

    for (let row of board ) {
      for (let column of row) {
        if (column.thereIsAMine()) {
          numOfMines++;
        }
      }
    }

    expect(numOfMines).toEqual(board.length);
  });

  it('looking for empty squares', () => {
    const boardGame: BoardGame = new BoardGame();
    const boardOfMines: Array<Array<boolean>> = [[false, false, false, false, false, false],
                                                 [true,  false, false, false, false, false],
                                                 [false, false, true,  false, false, false],
                                                 [false, true,  false, false, false, false],
                                                 [false, true,  false, false, false, false],
                                                 [false, false, true,  false, false, false]];

    const boardTmpByRename: Array<Array<number>> = [[1, 1, 0, 0, 0, 0],
                                                    [0, 2, 1, 1, 0, 0],
                                                    [2, 3, 1, 1, 0, 0],
                                                    [2, 2, 3, 1, 0, 0],
                                                    [2, 2, 3, 1, 0, 0],
                                                    [1, 2, 1, 1, 0, 0]];


    const board: Array<Array<Square>> = new Array<Array<Square>>();
    let sequence = 1;
    for (let row = 0; row < boardOfMines.length; row++) {
      board[row] = new Array<Square>();
      for (let column = 0; column < boardOfMines.length; column++) {
        const squareTmp: Square = new Square();
        squareTmp.setId(sequence++);
        if (boardOfMines[row][column]) {
          squareTmp.installMine();
        }
        squareTmp.setNumberOfMinesAround(boardTmpByRename[row][column]);
        board[row].push(squareTmp);
      }
    }

    const selectedSquare: Square = new Square();

    const result: Array<Array<Square>> = boardGame.revealsNumberOfNeighborWithMine(board,selectedSquare);
    let tex = "";
    for (let row of result ) {
      for (let column of row) {
        tex += "-" + column.isOpen();
      }
      console.log(tex);
      tex = "";
    }



    expect(new BoardGame()).toBeTruthy();
  });*/

});

