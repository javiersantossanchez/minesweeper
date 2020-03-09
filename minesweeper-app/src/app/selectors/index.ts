import { SquareState } from './../dtos/square-state-dto';
import { createSelector } from '@ngrx/store';
import { GameState, GAME_STATUS } from '../dtos/game-state';

export const getBoardGame = createSelector(
  (state: any) => state.rootState,
  (state: GameState): any => state.gameBoard
);

export const getGameBoardLength = createSelector(
  (state: any) => state.rootState,
  (state: GameState): any => state.gameBoardLength
);

export const squareStatusSelector = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props): SquareState  => {
                return {  isClosed: state.gameBoard[props.row][props.column].isClosed(),
                          isOpen: state.gameBoard[props.row][props.column].isOpen(),

    isMine: state.gameBoard[props.row][props.column].isMine(),

    numberOfMinesAround: state.gameBoard[props.row][props.column].getNumberOfMineAround(),

    isMarked: state.gameBoard[props.row][props.column].isMarked(),

    isBroken: state.gameBoard[props.row][props.column].isBroken(),
  };
  }
);


export const isClosed = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props) => state.gameBoard[props.row][props.column].isClosed()
);

// export const isOpen = createSelector(
//   (state: any) => state.rootState,
//   (state: GameState, props) => state.gameBoard[props.row][props.column].isOpen()
// );

export const isAMine = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props) => state.gameBoard[props.row][props.column].isMine()
);

export const isMarked = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props) => state.gameBoard[props.row][props.column].isMarked()
);

export const isBroken = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props) => state.gameBoard[props.row][props.column].isBroken()
);

export const numberOfMinesAround = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props) => state.gameBoard[props.row][props.column].getNumberOfMineAround()
);

export const gameStatus = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props): boolean => state.gameStatus === props.status
);
