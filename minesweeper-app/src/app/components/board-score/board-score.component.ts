import { timeOutAction, generateGameBoardAction } from './../../actions/index';
import { gameStatus, boardScoreStatus } from './../../selectors/index';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CountdownEvent, CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { BoardScoreState } from 'src/app/dtos/board-score-state';
import { ConfigurationService } from 'src/app/services/impl/configuration.service';
import { BoardGameService } from 'src/app/services/def/board-game.service';

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

  prettyConfig: CountdownConfig;

  public level = 'easy';


  constructor(private store: Store<GameState>, private boardGameService: BoardGameService, private configurationService: ConfigurationService) {}

  ngOnInit() {

    this.prettyConfig = {
      notify: [2, 5],
      leftTime: this.configurationService.timeDuration(),
      format: 'HH:mm:ss',
      prettyText: (text) => `<span class="test-class">${text}</span>`,
    };

    this.boardScoreStateObservable = this.boardGameService.getBoardScore();
    this.boardGameService.isPlaying().subscribe( isPlaying => { if (!isPlaying) { this.countdown.pause(); } });


  }

  handleCountdownEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.store.dispatch(timeOutAction());
    }
  }

  handlerChangeLevelEvent() {
    this.configurationService.changeLevel(this.level);
    this.handlerRestartEvent();
  }

  handlerRestartEvent() {
    this.boardGameService.generateBoard();
    this.countdown.config.leftTime = this.configurationService.timeDuration();
    this.countdown.restart();
  }
}
