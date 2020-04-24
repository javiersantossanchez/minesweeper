import { SquareState } from './../dtos/square-state-dto';
import { createSelector } from '@ngrx/store';
import { GameState, } from '../dtos/game-state';
import { Square } from '../entities/square';

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

export const gameStatus = createSelector(
  (state: any) => state.rootState,
  (state: GameState, props): boolean =>state.gameStatus === props.status
);
