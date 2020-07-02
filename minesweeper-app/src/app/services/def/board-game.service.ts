import { searchMinesAction } from 'src/app/actions';
import { Injectable } from '@angular/core';
import { BoardGame } from '../impl/board-game';
import { Square } from 'src/app/entities/square';
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

  abstract isPlaying(): Observable<boolean>;

  abstract getBoardScore(): Observable<BoardScoreState>;

  abstract getSquareStatus(row: number, column: number): Observable<SquareState>;

  abstract generateBoard(): Observable<any>;

  abstract searchMines(boardGame: Square[][], selectedSquare: Square): SearchMinesResult;

  abstract explodeAllMines(board: Square[][]): Square[][];

}
