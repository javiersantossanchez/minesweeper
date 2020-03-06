import { gameStatus } from './../../selectors/index';
import { Component, OnInit } from '@angular/core';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-score',
  templateUrl: './board-score.component.html',
  styleUrls: ['./board-score.component.sass']
})
export class BoardScoreComponent implements OnInit {

  gameStatusLoseObservable: Observable<boolean> ;

  gameStatusWinObservable: Observable<boolean> ;

  constructor(private store: Store<GameState>) { }


  ngOnInit() {
    this.gameStatusLoseObservable = this.store.select(gameStatus,{status: GAME_STATUS.LOSE});
    this.gameStatusWinObservable = this.store.select(gameStatus,{status: GAME_STATUS.WIN});
  }

}
