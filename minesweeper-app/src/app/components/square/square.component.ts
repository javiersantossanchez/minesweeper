import { Square } from './../../entities/square';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { squareStatusSelector, } from 'src/app/selectors';
import { Store } from '@ngrx/store';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { searchMinesAction, setMarkOnMineAction } from 'src/app/actions';
import { SquareState } from 'src/app/dtos/square-state-dto';

@Component({
  selector: "app-square",
  templateUrl: "./square.component.html",
  styleUrls: ["./square.component.sass"]
})
export class SquareComponent implements OnInit {
  @Input()
  rowIndex: number;

  @Input()
  columnIndex: number;

  @Input()
  isPlaying: boolean;

  squareStatusObservable: Observable<SquareState>;

  constructor(private store: Store<GameState>) {}

  ngOnInit() {
    this.squareStatusObservable = this.store.select(squareStatusSelector, {
      row: this.rowIndex,
      column: this.columnIndex
    });
  }

  open(): void {
    this.store.dispatch(
      searchMinesAction({ rowIndex: this.rowIndex, columnIndex: this.columnIndex })
    );
  }

  mark($event: MouseEvent): void {
    $event.preventDefault();
    this.store.dispatch(
      setMarkOnMineAction({ rowIndex: this.rowIndex, columnIndex: this.columnIndex })
    );
  }
}
