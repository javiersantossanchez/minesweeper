import { SquareComponent } from './../square/square.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { BoardGameComponent } from './board-game.component';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { NgLetModule } from '@ngrx-utils/store';
import { getGameBoardLength, gameStatus, squareStatusSelector } from 'src/app/selectors';
import { SquareState } from 'src/app/dtos/square-state-dto';

describe('BoardGameComponent', () => {
  let component: BoardGameComponent;
  let fixture: ComponentFixture<BoardGameComponent>;
  let store: MockStore<GameState>;
  let mockUsernameSelector: MemoizedSelector<GameState, number>;
  let asd: MemoizedSelectorWithProps<GameState, GAME_STATUS, boolean>;

  let qweqew: MemoizedSelectorWithProps<GameState, {
    row: number;
    column: number;
  }, SquareState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGameComponent,
                      SquareComponent],
      imports : [ NgLetModule ],
      providers: [provideMockStore(), ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGameComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    mockUsernameSelector = store.overrideSelector(
      getGameBoardLength,
      6
    );

    asd = store.overrideSelector(
      gameStatus,
      true
    );


    const value: SquareState = {
      isClosed: true,
      isOpen: false,
      isMine: true,
      numberOfMinesAround: 0,
      isMarked: true,
      isBroken: false};
      qweqew = store.overrideSelector(
      squareStatusSelector,
      value
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
