import { SquareComponent } from './../square/square.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { BoardGameComponent } from './board-game.component';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';

describe('BoardGameComponent', () => {
  let component: BoardGameComponent;
  let fixture: ComponentFixture<BoardGameComponent>;
  let store: MockStore<GameState>;
  const initialState: GameState = { gameBoard: [[],[],[]], gameBoardLength: 0, availableMarks: 0, installedMines: 0, numberOfOpenMines: 0,gameStatus: GAME_STATUS.PLAYING};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGameComponent,
                      SquareComponent],
      providers: [provideMockStore({ initialState }), ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGameComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
