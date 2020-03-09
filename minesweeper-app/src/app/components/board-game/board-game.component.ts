import { async } from '@angular/core/testing';
import { generateGameBoardAction,searchMinesAction } from './../../actions/index';
import { Component, OnInit } from '@angular/core';
import { Square } from 'src/app/entities/square';
import { BoardGameService } from 'src/app/services/def/board-game.service';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getBoardGame, getGameBoardLength, isClosed, gameStatus } from 'src/app/selectors';


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
