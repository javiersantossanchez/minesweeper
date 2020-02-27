import { async } from '@angular/core/testing';
import { generateBoardGame,searchByMines } from './../../actions/index';
import { Component, OnInit } from '@angular/core';
import { Square } from 'src/app/entities/square';
import { BoardGameService } from 'src/app/services/def/board-game.service';
import { BoardDto } from 'src/app/dtos/board-dto';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getBoardGame, getGameBoardLength, isClosed } from 'src/app/selectors';


@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.sass']
})
export class BoardGameComponent implements OnInit {

  board: Observable<Array<Array<Square>>> = this.store.select(getBoardGame);

  private boardGameLengthObservable: Observable<number> = this.store.select(getGameBoardLength);



  arrayToDraw: any[];

  constructor(private store: Store<BoardDto> ) {
  }

  ngOnInit() {
    this.boardGameLengthObservable.subscribe(boardGameLength => { this.arrayToDraw = Array(boardGameLength); });
    this.store.dispatch(generateBoardGame());
  }

  selectOneSquare(selectedSquare: Square) {
    //this.store.dispatch(searchByMines({selectedSquare}));
  }
}
