import { Square } from './../../entities/square';
import { searchMinesAction } from 'src/app/actions';
import { Injectable } from '@angular/core';
import { BoardGame } from '../impl/board-game';
import { Observable } from 'rxjs';
import { SearchMinesResult } from 'src/app/dtos/search-mines-result-dto';
import { ConfigurationService } from '../impl/configuration.service';
import { SquareState } from 'src/app/dtos/square-state-dto';
import { Store } from '@ngrx/store';
import { GameState } from 'src/app/dtos/game-state';
import { BoardScoreState } from 'src/app/dtos/board-score-state';

@Injectable({
  providedIn: 'root',
  useClass: BoardGame
})
export abstract class BoardGameService {

  constructor(configurationService: ConfigurationService, store: Store<GameState>) { }

  abstract generateBoard(): Observable<Square[][]>;

  abstract  timeIsOver();


  abstract isPlaying(): Observable<boolean>;

  abstract getBoardScore(): Observable<BoardScoreState>;

  abstract getSquareStatus(row: number, column: number): Observable<SquareState>;

  abstract  markSquare(row: number, column: number): void;

  abstract  searchMines(row: number, column: number);

}
