import { Square, STATUS } from 'src/app/entities/square';
import { BoardGameService } from '../def/board-game.service';
import { TestBed, inject } from '@angular/core/testing';
import { ConfigurationService } from './configuration.service';

describe('BoardGame', () => {
  let service: BoardGameService;

  const configurationService = jasmine.createSpyObj('GenericService', ['lengthBoard', 'numberOfMines']);


  beforeEach(() => {TestBed.configureTestingModule({providers: [{ provide: ConfigurationService, useValue: configurationService }]});
                    service = TestBed.get(BoardGameService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });


  it('Generates board with a valid number of mines', inject([BoardGameService], () => {
    const numOfMinesExpected = 5;
    configurationService.lengthBoard.and.returnValue(6);
    configurationService.numberOfMines.and.returnValue(numOfMinesExpected);
    const board: Square[][] = service.generateBoard();

    const totalMines =
          board.map(
                      row => row.map( square => square.isMine() ? 1 : 0).reduce((sum, current) => sum + current , 0)
                   ).reduce((sum, current) => sum + current , 0);
    expect(totalMines).toEqual(numOfMinesExpected);
   }));

  it('Generates board with a zero mines', inject([BoardGameService], () => {
    const numOfMinesExpected = 0;
    configurationService.lengthBoard.and.returnValue(6);
    configurationService.numberOfMines.and.returnValue(numOfMinesExpected);
    const board: Square[][] = service.generateBoard();
    const totalMines =
          board.map(
                      row => row.map( square => square.isMine() ? 1 : 0).reduce((sum, current) => sum + current , 0)
                   ).reduce((sum, current) => sum + current , 0);
    expect(totalMines).toEqual(numOfMinesExpected);
   }));

  it('Generates board with a negative numbers of mines', inject([BoardGameService], () => {
    const numOfMinesExpected = -1;
    configurationService.lengthBoard.and.returnValue(6);
    configurationService.numberOfMines.and.returnValue(numOfMinesExpected);
    const board: Square[][] = service.generateBoard();
    expect(board).toBeNull();
   }));

  it('Generates board with a valid number of squares', inject([BoardGameService], () => {
    const boardLengthExpected = 6;
    configurationService.lengthBoard.and.returnValue(boardLengthExpected);
    configurationService.numberOfMines.and.returnValue(1);
    const board: Square[][] = service.generateBoard();

    let allLengthIsOk =
              board.map( row => row.length === boardLengthExpected).reduce((finalResult, current) => finalResult && current, true);
    allLengthIsOk = allLengthIsOk && (boardLengthExpected === board.length);

    expect(allLengthIsOk).toBeTruthy();
  }));

  it('Generates board with a valid Zero squares', inject([BoardGameService], () => {
    const boardLengthExpected = 0;
    configurationService.lengthBoard.and.returnValue(boardLengthExpected);
    const board: Square[][] = service.generateBoard();

    expect(board).toBeNull();
  }));

  it('Generates board with a valid negative number of squares', inject([BoardGameService], () => {
    const boardLengthExpected = -1;
    configurationService.lengthBoard.and.returnValue(boardLengthExpected);
    const board: Square[][] = service.generateBoard();

    expect(board).toBeNull();
  }));

  it('explode all mines with null as board', inject([BoardGameService], () => {
    const board: Square[][] = service.explodeAllMines(null);

    expect(board).toBeNull();
  }));

  it('explode all mines correctly', inject([BoardGameService], () => {
    const numOfMinesExpected = 3;
    const length = 4;
    const initialSquare: Array<Array<Square>> = new Array<Array<Square>>();
    for (let indexRow = 1; indexRow <= length; indexRow++) {
      const row: Array<Square> = new Array<Square>();
      for (let indexColumn = 1; indexColumn <= length; indexColumn++) {
        const square: Square = new Square(0, indexRow, indexColumn, STATUS.CLOSED, false, false, 0);
        row.push(square);
      }
      initialSquare.push(row);
    }


    initialSquare[0][1].installMine();
    initialSquare[2][3].installMine();
    initialSquare[1][1].installMine();

    const board: Square[][] = service.explodeAllMines(initialSquare);
    const numOfMinesResult = board.map(row => row.filter( square => square.isMine()).length).reduce((finalResult, current) => finalResult + current, 0);

    expect(numOfMinesResult).toEqual(numOfMinesExpected);
  }));

});

