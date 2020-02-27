import { createAction, props } from '@ngrx/store';
import { Square } from '../entities/square';

export const loadBoardGame = createAction('[board-game] load', props<{ boardGame: Array<Array<Square>>, gameBoardLength: number }>());
export const generateBoardGame = createAction('[board-game] generate');
export const searchByMines =  createAction('[board-game] search', props<{ rowIndex: number, columnIndex: number }>());
export const setMark =  createAction('[board-game] set mark', props<{ rowIndex: number, columnIndex: number }>());
