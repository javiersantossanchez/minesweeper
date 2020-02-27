import { setMark } from './../actions/index';
import { Square, STATUS } from './square';

describe('Square', () => {
  it('should create an instance', () => {
    expect(new Square(1, 0, 0)).toBeTruthy();
  });

  it('should create it with  status close ', () => {
    expect(new Square(1, 0, 0).isClosed()).toBeTruthy();
  });

  it('Open the square without mine', () => {
    let square: Square;
    square = new Square(1, 0, 0);
    square.push();
    expect(square.isOpen()).toBeTruthy();
  });

  it('Open the square wit a mine', () => {
    let square: Square;
    square = new Square(1, 0, 0, STATUS.CLOSED, true);
    square.push();
    expect(square.isBroken()).toBeTruthy();
  });

  it('Activate mine successful', () => {
    let square: Square;
    square = new Square(1, 0, 0);
    square.installMine();
    expect(square.isMine()).toBeTruthy();
  });

  it('set a mark to a mine with CLOSED status', () => {
    let square: Square;
    square = new Square(1, 0, 0);
    square.setMark();
    expect(square.isMarked()).toBeTruthy();
  });

  it('set a mark to a mine with MARKED already set', () => {
    let square: Square;
    square = new Square(1, 0, 0, STATUS.CLOSED, false, true, 0);
    square.setMark();
    expect(square.isMarked()).toBeFalsy();
  });

  // it('set a mark to a square with open status', () => {
  //    let square: Square;
  //    square = new Square(1, 0, 0, STATUS.OPEN);
  //    expect(square.setMark()).toThrow('A mark cannot be set at a square with a status different to CLOSED');
  // });

});
