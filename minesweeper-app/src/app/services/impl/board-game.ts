import { BoardGenerator } from './../../generators/board-generator.generator';

import { Observable, of } from 'rxjs';
import { SearchMinesResult } from 'src/app/dtos/search-mines-result-dto';
import { Square } from 'src/app/entities/square';
import { BoardGameService } from 'src/app/services/def/board-game.service';
import { ConfigurationService } from './configuration.service';


export class BoardGame implements BoardGameService {

  private boardGenerator: BoardGenerator;

  constructor(private configurationService: ConfigurationService) {
    this.boardGenerator = new BoardGenerator();
  }

  explodeAllMines(board: Square[][]): Observable<Square[][]> {
    const result: Square[][] = board.map(row =>
      row.map(square => {
        if (square.isMine() && !square.isMarked()) {
          square.explodeMine();
        }
        return square;
      })
    );
    return of(result);
  }

  searchMines(board: Square[][], selectedSquare: Square): Observable<SearchMinesResult> {
    let searchMineResult = new SearchMinesResult(board, 0, 0);
    searchMineResult = this.iterativeSearch(searchMineResult, selectedSquare);
    console.log(searchMineResult);
    return of(searchMineResult);
  }

  private iterativeSearch(searchMineDto: SearchMinesResult, selectedSquare: Square): SearchMinesResult {

    const row: number = selectedSquare.getRowIndex();
    const column: number = selectedSquare.getColumnIndex();

    if (searchMineDto.isMarked(row, column)) {
      searchMineDto.setMark(row, column);
      searchMineDto.increaseNumberOfMarkRemoved();
    }
    searchMineDto.increaseNumberOfSquareOpened();
    searchMineDto.push(row, column);
    if (searchMineDto.getNumberOfMineAround(row, column) === 0) {
      if (row >= 1 && searchMineDto.isClosed(row - 1, column)) {
        this.iterativeSearch(searchMineDto, searchMineDto.getSquare(row - 1, column));
      }

      if (row < searchMineDto.getLength() - 1 && searchMineDto.isClosed(row + 1, column)) {
        this.iterativeSearch(searchMineDto, searchMineDto.getSquare(row + 1, column));
      }

      if (column >= 1 && searchMineDto.isClosed(row, column - 1)) {
        this.iterativeSearch(searchMineDto, searchMineDto.getSquare(row, column - 1));
      }

      if (column < searchMineDto.getLength() - 1 && searchMineDto.isClosed(row, column + 1)) {
        this.iterativeSearch(searchMineDto, searchMineDto.getSquare(row, column + 1));
      }

      if (row >= 1 && column >= 1 && searchMineDto.isClosed(row - 1, column - 1)) {
        this.iterativeSearch(searchMineDto, searchMineDto.getSquare(row - 1, column - 1));
      }

      if (
        row < searchMineDto.getLength() - 1 &&
        column < searchMineDto.getLength() - 1 &&
        searchMineDto.isClosed(row + 1, column + 1)
      ) {
        this.iterativeSearch(searchMineDto, searchMineDto.getSquare(row + 1, column + 1));
      }

      if (
        row >= 1 &&
        column < searchMineDto.getLength() - 1 &&
        searchMineDto.isClosed(row - 1, column + 1)
      ) {
        this.iterativeSearch(searchMineDto, searchMineDto.getSquare(row - 1, column + 1));
      }

      if (
        row < searchMineDto.getLength() - 1 &&
        column >= 1 &&
        searchMineDto.isClosed(row + 1, column - 1)
      ) {
        this.iterativeSearch(searchMineDto, searchMineDto.getSquare(row + 1, column - 1));
      }
    }
    return searchMineDto;
  }

  generateBoard(): Square[][] {
    let board: Array<Array<Square>> = this.boardGenerator.generateBoard( this.configurationService.lengthBoard());
    if(board != null){
      board = this.boardGenerator.calculateNumOfMinesAround(this.boardGenerator.installMines(board, this.configurationService.numberOfMines()));
    }
    return board;
  }

}
