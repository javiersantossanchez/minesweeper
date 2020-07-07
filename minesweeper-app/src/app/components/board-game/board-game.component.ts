import { Square } from './../../entities/square';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardGameService } from 'src/app/services/def/board-game.service';


@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.sass']
})
export class BoardGameComponent implements OnInit {

  gameStatusPlayingObservable: Observable<boolean> ;

  gameBoardObservable: Observable<Square[][]> ;


  constructor(private boardGameService: BoardGameService) {
  }

  ngOnInit() {
    this.gameStatusPlayingObservable = this.boardGameService.isPlaying();
    this.gameBoardObservable = this.boardGameService.generateBoard();
  }
}


