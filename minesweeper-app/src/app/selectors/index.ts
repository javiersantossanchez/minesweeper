import { SquareState } from './../dtos/square-state-dto';
import { createSelector } from '@ngrx/store';
import { GameState, GAME_STATUS, } from '../dtos/game-state';
import { BoardScoreState } from '../dtos/board-score-state';

export const getBoardGame = createSelector(
  (state: any) => state.rootState,
  (state: GameState): any => state.gameBoard
);

export const getBoardGame1 = createSelector(
  (state: any) => state.rootState,
  (state: GameState): any =>
         state.gameBoard.map( row => row.map(cell => ({row: cell.getRowIndex(), column: cell.getColumnIndex()})))
);


export const getGameBoardLength = createSelector(
  (state: any) => state.rootState,
  (state: GameState): any => state.gameBoardLength
);

export const squareStatusSelector = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props): SquareState  => {
  // TODO: a workaround to solve problem when the game board size is reduce. The stated is update before the component is destroyed,
  // Then the selector is alive and fired the event for a square outside of the new board dimensions
              if ( state.gameBoard.length <= props.row || state.gameBoard.length <= props.column) {
                return null;
              }
              return {
                          isClosed: state.gameBoard[props.row][props.column].isClosed(),
                          isOpen: state.gameBoard[props.row][props.column].isOpen(),
                          isMine: state.gameBoard[props.row][props.column].isMine(),
                          numberOfMinesAround: state.gameBoard[props.row][props.column].getNumberOfMineAround(),
                          isMarked: state.gameBoard[props.row][props.column].isMarked(),
                          isBroken: state.gameBoard[props.row][props.column].isBroken(),
              };
  }
);

export const gameStatus = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props): boolean =>  state.gameStatus === props.status
);

export const boardScoreStatus = createSelector(
  (state: any) => state.rootState,
  (state: GameState): BoardScoreState => {
                          return {
                            availableMarks: state.availableMarks,
                            installedMines: state.installedMines,
                            numberOfOpenMines: state.numberOfOpenMines,
                            lose:  state.gameStatus === GAME_STATUS.LOSE,
                            win: state.gameStatus === GAME_STATUS.WIN,
                            playing: state.gameStatus === GAME_STATUS.PLAYING,
                          };
            }
);
