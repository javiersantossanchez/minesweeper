import { gameStatusLose} from 'src/app/selectors';
import { GAME_STATUS } from './../../dtos/game-state';
import { Component, OnInit } from '@angular/core';
import { GameState } from 'src/app/dtos/game-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-score',
  templateUrl: './board-score.component.html',
  styleUrls: ['./board-score.component.sass']
})
export class BoardScoreComponent implements OnInit {

  gameStatusLoseObservable: Observable<boolean> ;

  constructor(private store: Store<GameState>) { }


  ngOnInit() {
    this.gameStatusLoseObservable = this.store.select(gameStatusLose);
    this.gameStatusLoseObservable.subscribe(youLose => {console.log(youLose);});
  }

}
