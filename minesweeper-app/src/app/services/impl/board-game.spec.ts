import { getGameBoardLength } from './../../selectors/index';
import { BoardGame } from './board-game';
import { Square } from 'src/app/entities/square';
import { BoardGameService } from '../def/board-game.service';

describe('BoardGame', () => {

  it('should create an instance', () => {
    expect(new BoardGame()).toBeTruthy();
  });

  it('Generates board with a valid number of mines', () => {
     const boardGameService: BoardGameService = new BoardGame();
     const board: Square[][] = boardGameService.generateBoard();
     const numOfMinesExpected = boardGameService.getNumberOfMines();

     const totalMines =
          board.map(
                      row => row.map( square => square.isMine() ? 1 : 0).reduce((sum, current) => sum + current , 0)
                   ).reduce((sum, current) => sum + current , 0);
     expect(totalMines).toEqual(numOfMinesExpected);
   });


  it('Generates board with a valid number of ', () => {
    const boardGameService: BoardGameService = new BoardGame();
    const board: Square[][] = boardGameService.generateBoard();
    const boardLengthExpected = boardGameService.getBoardSize();

    let allLengthIsOk =
              board.map( row => row.length === boardLengthExpected).reduce((finalResult, current) => finalResult && current, true);
    allLengthIsOk = allLengthIsOk && (boardLengthExpected === board.length);

    expect(allLengthIsOk).toBeTruthy();
  });


 /** it('looking for empty squares', () => {
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

