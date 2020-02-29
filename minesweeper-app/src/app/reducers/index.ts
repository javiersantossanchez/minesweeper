import { createReducer, on, Action } from '@ngrx/store';
import { BoardDto } from '../dtos/board-dto';
import { searchByMines, loadBoardGame, setMark} from '../actions';
import { Square } from '../entities/square';


const initialState: BoardDto = {
  gameBoard: [],
  gameBoardLength: 0,
  availableMarks: 0,
  installedMines: 0


};
const testReducerInner = createReducer(initialState,
  on(loadBoardGame,
     (state, action) => {
                          return {
                                    gameBoard : action.boardGame,
                                    gameBoardLength: action.gameBoardLength,
                                    availableMarks: action.availableMarks,
                                    installedMines: action.installedMines
                                  };
                        }
    ),
  on(searchByMines,
      (state, action) => {
                          return {
                                    gameBoard : revealsNumberOfNeighborWithMine(state.gameBoard, state.gameBoard[action.rowIndex][action.columnIndex]),
                                    gameBoardLength: state.gameBoardLength,
                                    availableMarks: state.availableMarks,
                                    installedMines: state.installedMines,
                                  };
                          }
    ),
  on(setMark, (state, action) => {
                                  let availableMarks = state.availableMarks;
                                  if (state.gameBoard[action.rowIndex][action.columnIndex].isMarked()){
                                    state.gameBoard[action.rowIndex][action.columnIndex].setMark();
                                    availableMarks++;
                                  } else if (
                                      !state.gameBoard[action.rowIndex][action.columnIndex].isMarked()
                                      &&
                                      state.availableMarks > 0
                                  ) {
                                    state.gameBoard[action.rowIndex][action.columnIndex].setMark();
                                    availableMarks--;
                                  }

                                  return {
                                              gameBoard : state.gameBoard,
                                              gameBoardLength: state.gameBoardLength,
                                              availableMarks,
                                              installedMines: state.installedMines,
                                           };
                                 }
  ),
  );


export function testReducer(state: BoardDto, action: Action) {
  return testReducerInner(state, action);
}


function revealsNumberOfNeighborWithMine(board: Array<Array<Square>>, selectedSquare: Square): Array<Array<Square>> {

  const row: number = selectedSquare.getRowIndex();
  const column: number = selectedSquare.getColumnIndex();

  board[row][column].push();
  if (board[row][column].getNumberOfMineAround() === 0) {
     if (row >= 1 && board[row - 1][column].isClosed()) {
      revealsNumberOfNeighborWithMine(board,  board[row - 1][column]);
     }

     if (row < board.length - 1 && board[row + 1][column].isClosed()) {
      revealsNumberOfNeighborWithMine(board, board[row + 1][column]);
     }

     if (column >= 1 && board[row ][column - 1].isClosed()) {
      revealsNumberOfNeighborWithMine(board, board[row][column - 1]);
     }

     if (column < board.length - 1 && board[row][column + 1].isClosed()) {
      revealsNumberOfNeighborWithMine(board, board[row][column + 1]);
     }

     if ((row >= 1) && (column >= 1) && board[row - 1][column - 1].isClosed()) {
      revealsNumberOfNeighborWithMine(board, board[row - 1][column - 1]);
     }

     if ((row < board.length - 1) && (column < board.length - 1) && board[row + 1][column + 1].isClosed()) {
      revealsNumberOfNeighborWithMine(board, board[row + 1][column + 1]);
     }

     if ((row >= 1) && (column < board.length - 1) && board[row - 1][column + 1].isClosed()) {
      revealsNumberOfNeighborWithMine(board, board[row - 1][column + 1]);
    }

     if ((row < board.length - 1) && (column >= 1) && board[row + 1][column - 1].isClosed()) {
      revealsNumberOfNeighborWithMine(board, board[row + 1][column - 1]);
    }
  }
  return  board;
}
