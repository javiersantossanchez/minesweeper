import { BoardGenerator } from './board-generator.generator';
import { Square, STATUS } from '../entities/square';

describe('BoardGenerator', () => {
  it('should create an instance', () => {
    expect(new BoardGenerator()).toBeTruthy();
  });

  it('Install mines correctly', () => {

    const generator = new BoardGenerator();

    const length = 5;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesExpected = 6;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }
    const boardResult: Array<Array<Square>> = generator.installMines(initialSquare, numberOfMinesExpected);
    const numberOfMinesResult =
        boardResult.map( row => row.filter(square => square.isMine())).map( row => row.length).reduce((sum, current) => sum + current , 0);

    expect(numberOfMinesResult).toEqual(numberOfMinesExpected);
  });

  it('install zero mines', () => {

    const generator = new BoardGenerator();

    const length = 5;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesExpected = 0;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }
    const boardResult: Array<Array<Square>> = generator.installMines(initialSquare, numberOfMinesExpected);
    const numberOfMinesResult =
        boardResult.map( row => row.filter(square => square.isMine())).map( row => row.length).reduce((sum, current) => sum + current , 0);

    expect(numberOfMinesResult).toEqual(numberOfMinesExpected);
  });

  it('install more mines than square available', () => {
    const generator = new BoardGenerator();

    const length = 3;
    const numberOfMinesExpected = (length * length) + 1;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }
    const boardResult: Array<Array<Square>> = generator.installMines(initialSquare, numberOfMinesExpected);
    expect(boardResult).toBeNull();
  });

  it('install a negative number of mines', () => {
    const generator = new BoardGenerator();

    const length = 3;
    const numberOfMinesExpected = -1;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }
    const boardResult: Array<Array<Square>> = generator.installMines(initialSquare, numberOfMinesExpected);
    expect(boardResult).toBeNull();
  });

});
