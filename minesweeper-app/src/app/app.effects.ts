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
import { SearchMinesResult } from './dtos/search-mines-result-dto';


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
            map( action => {
                            const board: Array<Array<Square>>  = this.boardGameService.explodeAllMines(action[1]);
                            return explodeAllMinesAction({boardGame: board});
                          }
            )
      )
  );

    searchingMines = createEffect(
      () => this.actions.pipe(
            ofType(searchMinesAction),
            withLatestFrom(this.store.select(getBoardGame)),
            map(([actionParam, storageResult]) => {
                              console.log(actionParam);
                              if (storageResult[actionParam.rowIndex][actionParam.columnIndex].isMine()) {
                              const board: Array<Array<Square>>  = this.boardGameService.explodeAllMines(storageResult);
                              return explodeAllMinesAction({boardGame: board});
                            } else {
                              const result: SearchMinesResult =
                                        this.boardGameService.searchMines(storageResult, storageResult[actionParam.rowIndex][actionParam.columnIndex]);
                              return searchMinesSuccessfulAction({
                                boardGame: result.getBoardGame(),
                                numberOfMarkRemoved: result.getNumberOfMarkRemoved(),
                                numberOfNewSquareOpen: result.getNumberOfSquareOpened(),
                              });
                            }
                          }
            )
      )
  );

}


