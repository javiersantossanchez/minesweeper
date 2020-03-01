import { Injectable } from '@angular/core';
import { BoardGame } from '../impl/board-game';
import { Square } from 'src/app/entities/square';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useClass: BoardGame
})
export abstract class BoardGameService {

  constructor() { }

  abstract generateBoard(): Observable<Array<Array<Square>>>;

  abstract getBoardSize(): number;

  abstract getNumberOfMines(): number;
}
