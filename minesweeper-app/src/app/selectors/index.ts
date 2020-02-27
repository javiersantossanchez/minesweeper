import { createSelector } from '@ngrx/store';
import { BoardDto } from '../dtos/board-dto';

export const getBoardGame = createSelector(
  (state: any) => state.rootState,
  (state: BoardDto): any => state.gameBoard
);

export const getGameBoardLength = createSelector(
  (state: any) => state.rootState,
  (state: BoardDto): any => state.gameBoardLength
);

export const isClosed = createSelector(
  (state: any) => state.rootState,
  (state: BoardDto, props) => state.gameBoard[props.row][props.column].isClosed()
);

export const isOpen = createSelector(
  (state: any) => state.rootState,
  (state: BoardDto, props) => state.gameBoard[props.row][props.column].isOpen()
);

export const isAMine = createSelector(
  (state: any) => state.rootState,
  (state: BoardDto, props) => state.gameBoard[props.row][props.column].isMine()
);

export const isMarked = createSelector(
  (state: any) => state.rootState,
  (state: BoardDto, props) => state.gameBoard[props.row][props.column].isMarked()
);

export const numberOfMinesAround = createSelector(
  (state: any) => state.rootState,
  (state: BoardDto, props) => state.gameBoard[props.row][props.column].getNumberOfMineAround()
);
