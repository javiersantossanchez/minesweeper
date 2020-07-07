import { SquareComponent } from './../square/square.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, MemoizedSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgLetModule } from '@ngrx-utils/store';
import { BoardGameComponent } from './board-game.component';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { getGameBoardLength, gameStatus } from 'src/app/selectors';
import { MockComponent } from 'ng-mocks';

describe('BoardGameComponent', () => {
  let component: BoardGameComponent;
  let fixture: ComponentFixture<BoardGameComponent>;
  let store: MockStore<GameState>;
  let mockUsernameSelector: MemoizedSelector<GameState, number>;
  let asd: MemoizedSelectorWithProps<GameState, GAME_STATUS, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGameComponent, MockComponent(SquareComponent)],
      imports : [ NgLetModule, ],
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
