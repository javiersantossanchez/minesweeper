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
import { loadBoardGameAction, gameOverAction, setMarkOnMineAction, searchMinesSuccessfulAction } from 'src/app/actions';
import { take } from 'rxjs/operators';


export class BoardGame implements BoardGameService {

  private boardGenerator: BoardGenerator;

  constructor(private confService: ConfigurationService, private store: Store<GameState>) {
    this.boardGenerator = new BoardGenerator();
  }

  /***
   * Generates the board game.
  */
  private buildBoardGame(sizeBoardGame: number, numberOfMines: number): Square[][] {

    let boardGame: Array<Array<Square>> = this.boardGenerator.generateBoard(sizeBoardGame);
    if (boardGame != null) {
      boardGame = this.boardGenerator
        .calculateNumOfMinesAround(this.boardGenerator.installMines(boardGame, numberOfMines));
    }
    return boardGame;

  }

  public generateBoard(): Observable<any> {

    const board: Array<Array<Square>> = this.buildBoardGame(this.confService.lengthBoard(), this.confService.numberOfMines());

    this.store.dispatch(
      loadBoardGameAction({
        boardGame: board,
        gameBoardLength: this.confService.lengthBoard(),
        availableMarks: this.confService.numberOfMines(),
        installedMines: this.confService.numberOfMines(),
      })
    );

    return this.store.select(getBoardGame1);
  }

  timeIsOver() {
    this.store.select(getBoardGame)
      .pipe(take(1))
      .subscribe(board => this.endGame(board));
  }

  private endGame(board: Square[][]) {
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
    this.store.dispatch(gameOverAction({boardGame: result}));
  }

  public searchMines(row: number, column: number) {
    this.store.select(getBoardGame).pipe(take(1))
    .subscribe(board => {

      if (board[row][column].isMine()) {
        this.endGame(board);
      } else {
        let searchMineResult = new SearchMinesResult(board, 0, 0);
        searchMineResult = this.recursiveSearchMines(searchMineResult, board[row][column]);

        this.store.dispatch(searchMinesSuccessfulAction({
          boardGame: searchMineResult.getBoardGame(),
          numberOfMarkRemoved: searchMineResult.getNumberOfMarkRemoved(),
          numberOfNewSquareOpen: searchMineResult.getNumberOfSquareOpened(),
        }));
      }
    });
  }


  private recursiveSearchMines(searchMineDto: SearchMinesResult, selectedSquare: Square): SearchMinesResult {
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
        this.recursiveSearchMines(searchMineDto, searchMineDto.getSquare(row - 1, column));
      }

      if (row < searchMineDto.getLength() - 1 && searchMineDto.isClosed(row + 1, column)) {
        this.recursiveSearchMines(searchMineDto, searchMineDto.getSquare(row + 1, column));
      }

      if (column >= 1 && searchMineDto.isClosed(row, column - 1)) {
        this.recursiveSearchMines(searchMineDto, searchMineDto.getSquare(row, column - 1));
      }

      if (column < searchMineDto.getLength() - 1 && searchMineDto.isClosed(row, column + 1)) {
        this.recursiveSearchMines(searchMineDto, searchMineDto.getSquare(row, column + 1));
      }

      if (row >= 1 && column >= 1 && searchMineDto.isClosed(row - 1, column - 1)) {
        this.recursiveSearchMines(searchMineDto, searchMineDto.getSquare(row - 1, column - 1));
      }

      if (
        row < searchMineDto.getLength() - 1 &&
        column < searchMineDto.getLength() - 1 &&
        searchMineDto.isClosed(row + 1, column + 1)
      ) {
        this.recursiveSearchMines(searchMineDto, searchMineDto.getSquare(row + 1, column + 1));
      }

      if (
        row >= 1 &&
        column < searchMineDto.getLength() - 1 &&
        searchMineDto.isClosed(row - 1, column + 1)
      ) {
        this.recursiveSearchMines(searchMineDto, searchMineDto.getSquare(row - 1, column + 1));
      }

      if (
        row < searchMineDto.getLength() - 1 &&
        column >= 1 &&
        searchMineDto.isClosed(row + 1, column - 1)
      ) {
        this.recursiveSearchMines(searchMineDto, searchMineDto.getSquare(row + 1, column - 1));
      }
    }
    return searchMineDto;
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


  public markSquare(row: number, column: number): void {
    this.store.select(getBoardGame).pipe(take(1))
    .subscribe(board => {

    });





    this.store.dispatch(
      setMarkOnMineAction({ rowIndex: row, columnIndex: column })
    );
  }

}
