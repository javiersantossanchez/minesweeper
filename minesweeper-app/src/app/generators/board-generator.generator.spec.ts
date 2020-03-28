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


  it('calculate number of mines around in the middle - 8 mines', () => {
    const generator = new BoardGenerator();

    const length = 4;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesAroundExpected = 8;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }

    initialSquare[0][0].installMine();
    initialSquare[0][1].installMine();
    initialSquare[0][2].installMine();
    initialSquare[1][0].installMine();
    initialSquare[1][2].installMine();
    initialSquare[2][0].installMine();
    initialSquare[2][1].installMine();
    initialSquare[2][2].installMine();

    const boardResult: Array<Array<Square>> = generator.calculateNumOfMinesAround(initialSquare);
    expect(boardResult[1][1].getNumberOfMineAround()).toEqual(numberOfMinesAroundExpected);
  });

  it('calculate number of mines around in the middle - 4 mines', () => {
    const generator = new BoardGenerator();

    const length = 4;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesAroundExpected = 4;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }

    initialSquare[0][0].installMine();
    initialSquare[0][2].installMine();
    initialSquare[2][0].installMine();
    initialSquare[2][2].installMine();

    const boardResult: Array<Array<Square>> = generator.calculateNumOfMinesAround(initialSquare);
    expect(boardResult[1][1].getNumberOfMineAround()).toEqual(numberOfMinesAroundExpected);
  });

  it('calculate number of mines around in the middle - zero mines', () => {
    const generator = new BoardGenerator();

    const length = 4;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesAroundExpected = 0;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }

    const boardResult: Array<Array<Square>> = generator.calculateNumOfMinesAround(initialSquare);
    expect(boardResult[1][1].getNumberOfMineAround()).toEqual(numberOfMinesAroundExpected);
  });

  it('calculate number of mines around in the top left corner - 3 mines', () => {
    const generator = new BoardGenerator();

    const length = 4;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesAroundExpected = 3;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }

    initialSquare[0][1].installMine();
    initialSquare[1][1].installMine();
    initialSquare[1][0].installMine();

    const boardResult: Array<Array<Square>> = generator.calculateNumOfMinesAround(initialSquare);
    expect(boardResult[0][0].getNumberOfMineAround()).toEqual(numberOfMinesAroundExpected);
  });

  it('calculate number of mines around in the top left corner - 1 mines', () => {
    const generator = new BoardGenerator();

    const length = 4;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesAroundExpected = 1;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }

    initialSquare[1][1].installMine();

    const boardResult: Array<Array<Square>> = generator.calculateNumOfMinesAround(initialSquare);
    expect(boardResult[0][0].getNumberOfMineAround()).toEqual(numberOfMinesAroundExpected);
  });

  it('calculate number of mines around in the top left corner - 0 mines', () => {
    const generator = new BoardGenerator();

    const length = 4;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesAroundExpected = 0;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }

    const boardResult: Array<Array<Square>> = generator.calculateNumOfMinesAround(initialSquare);
    expect(boardResult[0][0].getNumberOfMineAround()).toEqual(numberOfMinesAroundExpected);
  });

  it('calculate number of mines around in the bottom right corner - 3 mines', () => {
    const generator = new BoardGenerator();

    const length = 4;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    const numberOfMinesAroundExpected = 3;

    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }

    initialSquare[initialSquare.length - 2][initialSquare.length - 1].installMine();
    initialSquare[initialSquare.length - 2][initialSquare.length - 2].installMine();
    initialSquare[initialSquare.length - 1][initialSquare.length - 2].installMine();

    const boardResult: Array<Array<Square>> = generator.calculateNumOfMinesAround(initialSquare);
    expect(boardResult[initialSquare.length - 1][initialSquare.length - 1].getNumberOfMineAround()).toEqual(numberOfMinesAroundExpected);
  });

  it('calculate number of mines around with a null board', () => {
    const generator = new BoardGenerator();

    const boardRppesult: Array<Array<Square>> = generator.calculateNumOfMinesAround(null);
    expect(boardRppesult).toBeNull();
  });


  it('create a game board of 1x1 with right default status', () => {

    const generator = new BoardGenerator();
    const length = 1;
    const boardResult: Array<Array<Square>> = generator.generateBoard(length);
    let isStatusRight = boardResult[0][0].isClosed();
    isStatusRight = isStatusRight && !boardResult[0][0].isMine();
    isStatusRight = isStatusRight && !boardResult[0][0].isMarked();
    isStatusRight = isStatusRight && (boardResult[0][0].getNumberOfMineAround() === 0);

    expect(isStatusRight).toBeTruthy();
  });

  it('create a game board of 4x4 correctly', () => {

    const generator = new BoardGenerator();
    const length = 4;
    const numberSquareExpected = length * length;

    const boardResult: Array<Array<Square>> = generator.generateBoard(length);
    const numberSquareGenerated = boardResult.map( row => row.length).reduce((finalResult, current) => finalResult + current, 0);
    expect(numberSquareGenerated).toEqual(numberSquareExpected);
  });

  it('create a game board with negative value of length ', () => {

    const generator = new BoardGenerator();
    const length = -1;

    const boardResult: Array<Array<Square>> = generator.generateBoard(length);
    expect(boardResult).toBeNull();
  });

  it('create a game board with zero value of length ', () => {

    const generator = new BoardGenerator();
    const length = 0;

    const boardResult: Array<Array<Square>> = generator.generateBoard(length);
    expect(boardResult).toBeNull();
  });

});
