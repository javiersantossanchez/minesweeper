import { searchMinesAction } from 'src/app/actions';
import { Injectable } from '@angular/core';
import { BoardGame } from '../impl/board-game';
import { Square } from 'src/app/entities/square';
import { Observable } from 'rxjs';
import { SearchMinesResult } from 'src/app/dtos/search-mines-result-dto';

@Injectable({
  providedIn: 'root',
  useClass: BoardGame
})
export abstract class BoardGameService {

  constructor() { }

  abstract generateBoard(): Observable<Array<Array<Square>>>;

  abstract getBoardSize(): number;

  abstract getNumberOfMines(): number;

  abstract searchMines(boardGame: Square[][], selectedSquare: Square): Observable<SearchMinesResult>;
}
