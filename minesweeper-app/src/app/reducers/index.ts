import { timeOutAction } from './../actions/index';
import { createReducer, on, Action } from '@ngrx/store';
import { GameState, GAME_STATUS } from '../dtos/game-state';
import { searchMinesAction, loadBoardGameAction, setMarkOnMineAction } from '../actions';
import { Square } from '../entities/square';

const initialState: GameState = {
  gameBoard: [],
  gameBoardLength: 0,
  availableMarks: 0,
  installedMines: 0,
  gameStatus: GAME_STATUS.PLAYING,
  numberOfOpenMines: 0
};
const gameReducer = createReducer(initialState,
  on(loadBoardGameAction, (state, action) => {
    return Object.assign(
        {},
        state,
        {
          gameBoard: action.boardGame,
          gameBoardLength: action.gameBoardLength,
          availableMarks: action.availableMarks,
          installedMines: action.installedMines,
        }
    );
  }),
  on(searchMinesAction, (state, action) => {
    if (state.gameBoard[action.rowIndex][action.columnIndex].isMine()) {
      state.gameStatus = GAME_STATUS.LOSE;
      return Object.assign(
        {},
        explodeAllMines(
          state
        )
      );
    } else {
      const currentState: GameState = revealsNumberOfNeighborWithMine(
        state,
        state.gameBoard[action.rowIndex][action.columnIndex]
      );
      if (
        currentState.numberOfOpenMines + currentState.installedMines ===
        currentState.gameBoardLength * currentState.gameBoardLength
      ) {
        return Object.assign({}, currentState, { gameStatus: GAME_STATUS.WIN });
      } else {
        return Object.assign({}, currentState);
      }
    }
  }),
  on(setMarkOnMineAction, (state, action) => {
    let availableMarks = state.availableMarks;
    if (state.gameBoard[action.rowIndex][action.columnIndex].isMarked()) {
      state.gameBoard[action.rowIndex][action.columnIndex].setMark();
      availableMarks++;
    } else if (
      !state.gameBoard[action.rowIndex][action.columnIndex].isMarked() &&
      state.availableMarks > 0
    ) {
      state.gameBoard[action.rowIndex][action.columnIndex].setMark();
      availableMarks--;
    }
    return Object.assign({}, state, { availableMarks });
  }),
  on(timeOutAction, (state, action) => {
      state.gameStatus = GAME_STATUS.LOSE;
      return Object.assign(
        {},
        explodeAllMines(
          state
        )
      );
  }),
);

export function getGameReducer(state: GameState, action: Action) {
  return gameReducer(state, action);
}

function explodeAllMines(gameBoard: GameState): GameState {
  gameBoard.gameBoard = gameBoard.gameBoard.map(row =>
    row.map(square => {
      if (square.isMine() && !square.isMarked()) {
        square.explodeMine();
      }
      return square;
    })
  );
  return gameBoard;
}

function revealsNumberOfNeighborWithMine(
  gameBoard: GameState,
  selectedSquare: Square
): GameState {
  const row: number = selectedSquare.getRowIndex();
  const column: number = selectedSquare.getColumnIndex();

  const board: Array<Array<Square>> = gameBoard.gameBoard;
  if (board[row][column].isMarked()) {
    board[row][column].setMark();
    gameBoard.availableMarks++;
  }
  gameBoard.numberOfOpenMines++;
  board[row][column].push();
  if (board[row][column].getNumberOfMineAround() === 0) {
    if (row >= 1 && board[row - 1][column].isClosed()) {
      revealsNumberOfNeighborWithMine(gameBoard, board[row - 1][column]);
    }

    if (row < board.length - 1 && board[row + 1][column].isClosed()) {
      revealsNumberOfNeighborWithMine(gameBoard, board[row + 1][column]);
    }

    if (column >= 1 && board[row][column - 1].isClosed()) {
      revealsNumberOfNeighborWithMine(gameBoard, board[row][column - 1]);
    }

    if (column < board.length - 1 && board[row][column + 1].isClosed()) {
      revealsNumberOfNeighborWithMine(gameBoard, board[row][column + 1]);
    }

    if (row >= 1 && column >= 1 && board[row - 1][column - 1].isClosed()) {
      revealsNumberOfNeighborWithMine(gameBoard, board[row - 1][column - 1]);
    }

    if (
      row < board.length - 1 &&
      column < board.length - 1 &&
      board[row + 1][column + 1].isClosed()
    ) {
      revealsNumberOfNeighborWithMine(gameBoard, board[row + 1][column + 1]);
    }

    if (
      row >= 1 &&
      column < board.length - 1 &&
      board[row - 1][column + 1].isClosed()
    ) {
      revealsNumberOfNeighborWithMine(gameBoard, board[row - 1][column + 1]);
    }

    if (
      row < board.length - 1 &&
      column >= 1 &&
      board[row + 1][column - 1].isClosed()
    ) {
      revealsNumberOfNeighborWithMine(gameBoard, board[row + 1][column - 1]);
    }
  }
  return gameBoard;
}
