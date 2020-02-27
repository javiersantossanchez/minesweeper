import { Square } from './../../entities/square';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { isClosed, isOpen, isAMine, numberOfMinesAround, isMarked } from 'src/app/selectors';
import { Store } from '@ngrx/store';
import { BoardDto } from 'src/app/dtos/board-dto';
import { searchByMines, setMark } from 'src/app/actions';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.sass']
})
export class SquareComponent implements OnInit {


  @Input()
  rowIndex: number;

  @Input()
  columnIndex: number;

  @Output()
  selectEvent: EventEmitter<Square> = new EventEmitter<Square>();

   isClosedObservable: Observable<boolean> ;

   isOpenObservable: Observable<boolean> ;

   isAMineObservable: Observable<boolean> ;

   numberOfMinesAroundObservable: Observable<number> ;

   isMarkedObservable: Observable<boolean> ;


  constructor(private store: Store<BoardDto>) {
  }

  ngOnInit() {
    this.isClosedObservable = this.store.select(isClosed, {row: this.rowIndex, column: this.columnIndex});
    this.isOpenObservable = this.store.select(isOpen, {row: this.rowIndex, column: this.columnIndex});
    this.isAMineObservable = this.store.select(isAMine, {row: this.rowIndex, column: this.columnIndex});
    this.numberOfMinesAroundObservable = this.store.select(numberOfMinesAround, {row: this.rowIndex, column: this.columnIndex});
    this.isMarkedObservable = this.store.select(isMarked, {row: this.rowIndex, column: this.columnIndex});

  }


  open(): void {
    this.store.dispatch(searchByMines({ rowIndex: this.rowIndex, columnIndex: this.columnIndex}));
  }

  mark($event: MouseEvent): void {
    $event.preventDefault();
    this.store.dispatch(setMark({ rowIndex: this.rowIndex, columnIndex: this.columnIndex}));
  }




}
