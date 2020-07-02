import { createAction, props } from '@ngrx/store';
import { Square } from '../entities/square';


export const generateGameBoardAction = createAction('[board-game] generate');

export const loadBoardGameAction = createAction('[board-game] load', props<{
                                                                        boardGame: Array<Array<Square>>,
                                                                        gameBoardLength: number,
                                                                        availableMarks: number,
                                                                        installedMines: number,
                                                                      }>());

/**
 * Action used to unlock the squares, starting from a initial square
 */
export const searchMinesSuccessfulAction =
      createAction('[board-game] search Successful', props<{
                                                              boardGame: Array<Array<Square>>,
                                                              numberOfMarkRemoved: number,
                                                              numberOfNewSquareOpen: number
                                                            }>());

export const gameOverAction =
      createAction('[board-game] Game Over', props<{boardGame: Array<Array<Square>>, }>());


/**
 * Action used to unlock the squares, starting from a initial square
 */
export const searchMinesAction =  createAction('[board-game] search', props<{ rowIndex: number, columnIndex: number }>());

/**
 * Action used to set mark on a square. This mark is a flag to the user
 */
export const setMarkOnMineAction =  createAction('[board-game] set mark', props<{ rowIndex: number, columnIndex: number }>());
