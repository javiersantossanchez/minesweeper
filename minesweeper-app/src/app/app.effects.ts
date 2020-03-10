import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { generateGameBoardAction, loadBoardGameAction } from './actions';
import { map, mergeMap } from 'rxjs/operators';
import { BoardGameService } from './services/def/board-game.service';


@Injectable()
export class AppEffects {

  constructor(private actions: Actions, private boardGameService: BoardGameService) {}

   generateBoard = createEffect(
        () => this.actions.pipe(
              ofType(generateGameBoardAction),
              mergeMap( () =>
                this.boardGameService.generateBoard()
                .pipe(map( resp =>  loadBoardGameAction({
                                                  boardGame: resp,
                                                  gameBoardLength: this.boardGameService.getBoardSize(),
                                                  availableMarks: this.boardGameService.getNumberOfMines(),
                                                  installedMines: this.boardGameService.getNumberOfMines(),
                                                })))
              )
        )
    );

}


