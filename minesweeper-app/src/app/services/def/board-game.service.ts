import { searchMinesAction } from 'src/app/actions';
import { Injectable } from '@angular/core';
import { BoardGame } from '../impl/board-game';
import { Square } from 'src/app/entities/square';
import { Observable } from 'rxjs';
import { SearchMinesResult } from 'src/app/dtos/search-mines-result-dto';
import { ConfigurationService } from '../impl/configuration.service';

@Injectable({
  providedIn: 'root',
  useClass: BoardGame
})
export abstract class BoardGameService {

  constructor(configurationService: ConfigurationService) { }

  abstract generateBoard(): Array<Array<Square>>;

  abstract searchMines(boardGame: Square[][], selectedSquare: Square): SearchMinesResult;

  abstract explodeAllMines(board: Square[][]): Square[][];
}
