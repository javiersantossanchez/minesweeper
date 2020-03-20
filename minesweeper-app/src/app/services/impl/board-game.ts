import { BoardGenerator } from './../../generators/board-generator.generator';

import { Observable, of } from 'rxjs';
import { SearchMinesResult } from 'src/app/dtos/search-mines-result-dto';
import { Square } from 'src/app/entities/square';
import { BoardGameService } from 'src/app/services/def/board-game.service';


export class BoardGame implements BoardGameService {

  private boardGenerator: BoardGenerator;

  constructor() {
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
    const board: Array<Array<Square>> = new Array<Array<Square>>();
    let sequence = 1;

    for (let row = 0; row < this.getBoardSize(); row++) {
      board[row] = new Array<Square>();
      for (let column = 0; column < this.getBoardSize(); column++) {
        sequence++;
        const squareTmp: Square = new Square(sequence, row, column);
        board[row].push(squareTmp);
      }
    }
    return this.boardGenerator.calculateNumOfMinesAround(this.boardGenerator.installMines(board, this.getNumberOfMines()));
  }

  getBoardSize(): number {
    return 6;
  }

  getNumberOfMines(): number {
    return 5;
  }



}
