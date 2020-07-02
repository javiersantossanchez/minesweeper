import { Injectable } from '@angular/core';
import { Actions} from '@ngrx/effects';
import { BoardGameService } from './services/def/board-game.service';
import { GameState } from './dtos/game-state';
import { Store } from '@ngrx/store';
import { ConfigurationService } from './services/impl/configuration.service';


@Injectable()
export class AppEffects {

  constructor(private actions: Actions, private store: Store<GameState>, private boardGameService: BoardGameService,
              private configurationService: ConfigurationService) {}



  /**   timeOut = createEffect(
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
  **/

}


