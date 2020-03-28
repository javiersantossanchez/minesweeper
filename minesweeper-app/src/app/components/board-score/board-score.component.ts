import { timeOutAction, generateGameBoardAction } from "./../../actions/index";
import { gameStatus } from "./../../selectors/index";
import { Component, OnInit, ViewChild } from "@angular/core";
import { GameState, GAME_STATUS } from "src/app/dtos/game-state";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CountdownEvent, CountdownComponent } from "ngx-countdown";

@Component({
  selector: 'app-board-score',
  templateUrl: './board-score.component.html',
  styleUrls: ['./board-score.component.sass']
})
export class BoardScoreComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  gameStatusLoseObservable: Observable<boolean>;

  gameStatusWinObservable: Observable<boolean>;

  constructor(private store: Store<GameState>) {}

  ngOnInit() {
     this.gameStatusLoseObservable = this.store.select(gameStatus, {
      status: GAME_STATUS.LOSE
    });
    this.gameStatusWinObservable = this.store.select(gameStatus, {
      status: GAME_STATUS.WIN
    });

    this.store.select(gameStatus, {status: GAME_STATUS.PLAYING}).subscribe( isPlaying => { if (!isPlaying) { this.countdown.pause();} });
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
