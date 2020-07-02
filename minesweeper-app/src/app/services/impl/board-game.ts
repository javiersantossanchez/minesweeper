import { BoardGenerator } from './../../generators/board-generator.generator';

import { SearchMinesResult } from 'src/app/dtos/search-mines-result-dto';
import { Square } from 'src/app/entities/square';
import { BoardGameService } from 'src/app/services/def/board-game.service';
import { ConfigurationService } from './configuration.service';
import { Store } from '@ngrx/store';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { squareStatusSelector, gameStatus, getBoardGame1, boardScoreStatus, getBoardGame } from 'src/app/selectors';
import { SquareState } from 'src/app/dtos/square-state-dto';
import { Observable } from 'rxjs';
import { BoardScoreState } from 'src/app/dtos/board-score-state';
import { loadBoardGameAction, explodeAllMinesAction } from 'src/app/actions';


export class BoardGame implements BoardGameService {

  private boardGenerator: BoardGenerator;

  constructor(private configurationService: ConfigurationService, private store: Store<GameState>) {
    this.boardGenerator = new BoardGenerator();
  }

  buildBoard(lengthBoard: number, numberOfMines: number): Square[][] {
    let board: Array<Array<Square>> = this.boardGenerator.generateBoard(lengthBoard);
    if (board != null) {
      board = this.boardGenerator
        .calculateNumOfMinesAround(this.boardGenerator.installMines(board, numberOfMines));
    }
    return board;
  }

  generateBoard(): Observable<any> {

    const board: Array<Array<Square>>  =
      this.buildBoard(this.configurationService.lengthBoard(), this.configurationService.numberOfMines());
    this.store.dispatch(loadBoardGameAction({
      boardGame: board,
      gameBoardLength: this.configurationService.lengthBoard(),
      availableMarks: this.configurationService.numberOfMines(),
      installedMines: this.configurationService.numberOfMines(),
    }));
    return this.store.select(getBoardGame1);
  }


  getSquareStatus(row: number, column: number): Observable<SquareState> {
    return this.store.select(squareStatusSelector, {row, column});
  }

  getBoardScore(): Observable<BoardScoreState> {
    return this.store.select(boardScoreStatus);
  }

  public isPlaying(): Observable<boolean> {
    return this.isGameStatus(GAME_STATUS.PLAYING);
  }

  private isGameStatus(status: GAME_STATUS): Observable<boolean> {
    return this.store.select(gameStatus, {status });
  }




  explodeAllMines(board: Square[][]): Square[][] {
    if (board === null) {
      return null;
    }

    const result: Square[][] = board.map(row =>
      row.map(square => {
        if (square.isMine() && !square.isMarked()) {
          square.explodeMine();
        }
        return square;
      })
    );
    return result;
  }

  searchMines(board: Square[][], selectedSquare: Square): SearchMinesResult {

    let searchMineResult = new SearchMinesResult(board, 0, 0);
    searchMineResult = this.iterativeSearch(searchMineResult, selectedSquare);
    return searchMineResult;
  }

  private iterativeSearch(searchMineDto: SearchMinesResult, selectedSquare: Square): SearchMinesResult {
    if (searchMineDto.getBoardGame() === null || selectedSquare === null) {
      return null;
    }
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



}
