export enum STATUS {
    OPEN,
    CLOSED,
    BROKEN
}

export class Square {

  constructor(private id: number,
              private rowIndex: number,
              private columnIndex: number,
              private status: STATUS = STATUS.CLOSED,
              private mine: boolean = false,
              private marked: boolean = false,
              private numberOfMinesAround: number = 0) {
  }

  getRowIndex(): number {
    return this.rowIndex;
  }

  getColumnIndex(): number {
    return this.columnIndex;
  }

  getId(): number {
    return this.id;
  }
  isMarked(): boolean {
    return this.marked;
  }
  isClosed(): boolean {
    return this.status === STATUS.CLOSED;
  }

  isOpen(): boolean {
    return this.status === STATUS.OPEN;
  }

  isBroken(): boolean {
    return this.status === STATUS.BROKEN;
  }

  isMine(): boolean {
    return this.mine;
  }

  getNumberOfMineAround(): number {
   return this.numberOfMinesAround;
  }

  setNumberOfMinesAround(numberOfMineAround: number): void {
    this.numberOfMinesAround = numberOfMineAround;
  }

  push(): void {
    if (this.isMine()) {
      this.status = STATUS.BROKEN;
    } else {
      this.status = STATUS.OPEN;
    }
  }

  explodeMine() {
    this.status = STATUS.BROKEN;
  }

  setMark(): void {
    if (this.status !== STATUS.CLOSED) {
      throw new Error('A mark cannot be set at a square with a status different to CLOSED');
    }
    this.marked = !this.marked;
  }

  installMine(): void {
    this.mine = true;
  }

}


