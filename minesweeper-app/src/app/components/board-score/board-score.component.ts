import { timeOutAction, generateGameBoardAction } from './../../actions/index';
import { gameStatus, boardScoreStatus } from './../../selectors/index';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CountdownEvent, CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { BoardScoreState } from 'src/app/dtos/board-score-state';

@Component({
  selector: 'app-board-score',
  templateUrl: './board-score.component.html',
  styleUrls: ['./board-score.component.sass']
})
export class BoardScoreComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  gameStatusLoseObservable: Observable<boolean>;

  gameStatusWinObservable: Observable<boolean>;

  boardScoreStateObservable: Observable<BoardScoreState>;

  faPlayCircle = faPlayCircle;

  prettyConfig: CountdownConfig = {
    notify: [2, 5],
    leftTime: 30,
    format: 'HH:mm:ss',
    prettyText: (text) => `<span class="test-class">${text}</span>`,
  };

  constructor(private store: Store<GameState>) {}

  ngOnInit() {

     this.boardScoreStateObservable = this.store.select(boardScoreStatus);
     this.store.select(gameStatus, {status: GAME_STATUS.PLAYING}).subscribe( isPlaying => { if (!isPlaying) { this.countdown.pause(); } });


  }

  handleCountdownEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.store.dispatch(timeOutAction());
    }
  }

  handlerRestartEvent() {
    this.store.dispatch(generateGameBoardAction());
    this.countdown.restart();
  }
}
