import { generateGameBoardAction } from './../../actions/index';
import { Component, OnInit } from '@angular/core';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getGameBoardLength, gameStatus } from 'src/app/selectors';


@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.sass']
})
export class BoardGameComponent implements OnInit {

  private boardGameLengthObservable: Observable<number> = this.store.select(getGameBoardLength);

  gameStatusPlayingObservable: Observable<boolean> ;

  arrayToDraw: any[];

  constructor(private store: Store<GameState> ) {
  }

  ngOnInit() {
    this.gameStatusPlayingObservable = this.store.select(gameStatus, {status: GAME_STATUS.PLAYING});
    this.boardGameLengthObservable.subscribe(boardGameLength => { this.arrayToDraw = Array(boardGameLength); });
    this.store.dispatch(generateGameBoardAction());
  }
}
