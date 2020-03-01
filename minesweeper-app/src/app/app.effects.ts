import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { generateBoardGame, loadBoardGame } from './actions';
import { map, mergeMap } from 'rxjs/operators';
import { BoardGameService } from './services/def/board-game.service';


@Injectable()
export class AppEffects {

  constructor(private actions: Actions, private boardGameService: BoardGameService) {}

   generateBoard = createEffect(
        () => this.actions.pipe(
              ofType(generateBoardGame),
              mergeMap( () =>
                this.boardGameService.generateBoard()
                .pipe(map( resp => loadBoardGame({
                                                  boardGame: resp,
                                                  gameBoardLength: this.boardGameService.getBoardSize(),
                                                  availableMarks: this.boardGameService.getNumberOfMines(),
                                                  installedMines: this.boardGameService.getNumberOfMines(),
                                                })))
              )
        )
    );

}


