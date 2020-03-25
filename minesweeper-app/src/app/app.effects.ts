import { getBoardGame } from './selectors/index';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { generateGameBoardAction, loadBoardGameAction, searchMinesAction, searchMinesSuccessfulAction, explodeAllMinesAction, timeOutAction } from './actions';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { BoardGameService } from './services/def/board-game.service';
import { GameState } from './dtos/game-state';
import { Store } from '@ngrx/store';
import { Square } from './entities/square';
import { ConfigurationService } from './services/impl/configuration.service';


@Injectable()
export class AppEffects {

  constructor(private actions: Actions, private store: Store<GameState>, private boardGameService: BoardGameService, private configurationService: ConfigurationService) {}

   generateBoard = createEffect(
        () => this.actions.pipe(
              ofType(generateGameBoardAction),
              map( () => {
                const board: Array<Array<Square>>  = this.boardGameService.generateBoard();
                return loadBoardGameAction({
                                                  boardGame: board,
                                                  gameBoardLength: this.configurationService.lengthBoard(),
                                                  availableMarks: this.configurationService.numberOfMines(),
                                                  installedMines: this.configurationService.numberOfMines(),
                                                });
                                              }
              )
        )
    );

    timeOut = createEffect(
      () => this.actions.pipe(
            ofType(timeOutAction),
            withLatestFrom(this.store.select(getBoardGame)),
            mergeMap( action =>
              this.boardGameService.explodeAllMines(action[1])
              .pipe(map( resp => explodeAllMinesAction({boardGame: resp})))
            )
      )
  );

    searchingMines = createEffect(
      () => this.actions.pipe(
            ofType(searchMinesAction),
            withLatestFrom(this.store.select(getBoardGame)),
            mergeMap(action => {
                       if (action[1][action[0].rowIndex][action[0].columnIndex].isMine()) {
                         return this.boardGameService.explodeAllMines(action[1])
                         .pipe(map( resp => explodeAllMinesAction({boardGame: resp})));
                       } else {
                        return this.boardGameService.searchMines(action[1], action[1][action[0].rowIndex][action[0].columnIndex])
                                          .pipe(map( resp =>  searchMinesSuccessfulAction({
                                                boardGame: resp.getBoardGame(),
                                                numberOfMarkRemoved: resp.getNumberOfMarkRemoved(),
                                                numberOfNewSquareOpen: resp.getNumberOfSquareOpened(),
                                              })));
                      }
                                            }
            )
      )
  );

}


