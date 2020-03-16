import { Square } from '../entities/square';


export class SearchMinesResult {
  constructor(private gameBoard: Array<Array<Square>>, private numberOfSquareOpened: number, private numberOfMarkRemoved: number) {}

  public isMarked(indexRow: number, indexColumn: number): boolean {
    return this.gameBoard[indexRow][indexColumn].isMarked();
  }

  public isClosed(indexRow: number, indexColumn: number): boolean {
    return this.gameBoard[indexRow][indexColumn].isClosed();
  }

  public setMark(indexRow: number, indexColumn: number) {
    this.gameBoard[indexRow][indexColumn].setMark();
  }

  public push(indexRow: number, indexColumn: number) {
    this.gameBoard[indexRow][indexColumn].push();
  }

  public getNumberOfMineAround(indexRow: number, indexColumn: number): number{
    return this.gameBoard[indexRow][indexColumn].getNumberOfMineAround();
  }

  public increaseNumberOfMarkRemoved() {
    this.numberOfMarkRemoved++;
  }

  public increaseNumberOfSquareOpened() {
    this.numberOfSquareOpened++;
  }

  public getSquare(indexRow: number, indexColumn: number): Square{
    return this.gameBoard[indexRow][indexColumn];
  }
   public getLength() {
     return this.gameBoard.length;
   }

   public getBoardGame() {
    return this.gameBoard;
   }

   public getNumberOfSquareOpened(): number {
    return this.numberOfSquareOpened;
   }

   public getNumberOfMarkRemoved(): number {
    return this.numberOfMarkRemoved;
   }
}
