import { getBoardGame } from './selectors/index';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { generateGameBoardAction, loadBoardGameAction, searchMinesAction, searchMinesSuccessfulAction } from './actions';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { BoardGameService } from './services/def/board-game.service';
import { GameState } from './dtos/game-state';
import { Store } from '@ngrx/store';


@Injectable()
export class AppEffects {

  constructor(private actions: Actions, private store: Store<GameState>, private boardGameService: BoardGameService) {}

   generateBoard = createEffect(
        () => this.actions.pipe(
              ofType(generateGameBoardAction),
              mergeMap( () =>
                this.boardGameService.generateBoard()
                .pipe(map( resp => loadBoardGameAction({
                                                  boardGame: resp,
                                                  gameBoardLength: this.boardGameService.getBoardSize(),
                                                  availableMarks: this.boardGameService.getNumberOfMines(),
                                                  installedMines: this.boardGameService.getNumberOfMines(),
                                                })))
              )
        )
    );

    searchingMines = createEffect(
      () => this.actions.pipe(
            ofType(searchMinesAction),
            withLatestFrom(this.store.select(getBoardGame)),
            mergeMap(action =>
              this.boardGameService.searchMines(action[1], action[1][action[0].rowIndex][action[0].columnIndex])
              .pipe(map( resp =>  searchMinesSuccessfulAction({
                                                boardGame: resp.getBoardGame(),
                                                numberOfMarkRemoved: resp.getNumberOfMarkRemoved(),
                                                numberOfNewSquareOpen: resp.getNumberOfSquareOpened(),
                                              })))
            )
      )
  );

}


