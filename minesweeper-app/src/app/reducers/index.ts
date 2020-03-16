import { gameStatus } from './../selectors/index';
import { timeOutAction, searchMinesSuccessfulAction } from './../actions/index';
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
  on(searchMinesSuccessfulAction, (state, action) => {
      const newNumberOfOpenSquare = state.numberOfOpenMines + action.numberOfNewSquareOpen;
      let newGameStatus = state.gameStatus;
      if (newNumberOfOpenSquare + state.installedMines ===
          state.gameBoardLength * state.gameBoardLength) {
            newGameStatus = GAME_STATUS.WIN;
      }

      return Object.assign({}, state, { gameBoard: action.boardGame,
                                          availableMarks: state.availableMarks + action.numberOfMarkRemoved,
                                          numberOfOpenMines: newNumberOfOpenSquare,
                                          gameStatus: newGameStatus,
                                        });
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


