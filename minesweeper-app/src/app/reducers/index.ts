import {  searchMinesSuccessfulAction, explodeAllMinesAction } from './../actions/index';
import { createReducer, on, Action } from '@ngrx/store';
import { GameState, GAME_STATUS } from '../dtos/game-state';
import { loadBoardGameAction, setMarkOnMineAction } from '../actions';

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
        initialState,
        {
          gameBoard: action.boardGame,
          gameBoardLength: action.gameBoardLength,
          availableMarks: action.availableMarks,
          installedMines: action.installedMines,
        }
    );
  }),
  on(explodeAllMinesAction, (state, action) => {
    return Object.assign({}, state, { gameBoard: action.boardGame, gameStatus: GAME_STATUS.LOSE});
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
);

export function getGameReducer(state: GameState, action: Action) {
  return gameReducer(state, action);
}

