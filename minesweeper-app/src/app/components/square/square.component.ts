import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { squareStatusSelector, } from 'src/app/selectors';
import { Store } from '@ngrx/store';
import { GameState } from 'src/app/dtos/game-state';
import { searchMinesAction, setMarkOnMineAction } from 'src/app/actions';
import { SquareState } from 'src/app/dtos/square-state-dto';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-square",
  templateUrl: "./square.component.html",
  styleUrls: ["./square.component.sass"]
})
export class SquareComponent implements OnInit, OnDestroy  {
  @Input()
  rowIndex: number;

  @Input()
  columnIndex: number;

  @Input()
  isPlaying: boolean;

  squareStatusObservable: Observable<SquareState>;

  faCircle = faCircle;

  constructor(private store: Store<GameState>) {}
  ngOnDestroy(): void {
    this.squareStatusObservable = null;
    console.log("ok")
  }

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
