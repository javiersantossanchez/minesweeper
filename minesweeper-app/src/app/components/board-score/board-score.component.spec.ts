import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardScoreComponent } from './board-score.component';
import { CountdownModule } from 'ngx-countdown';
import { NgLetModule } from '@ngrx-utils/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GameState, GAME_STATUS} from 'src/app/dtos/game-state';
import { MemoizedSelectorWithProps, MemoizedSelector, Store} from '@ngrx/store';
import { gameStatus } from 'src/app/selectors';

describe('BoardScoreComponent', () => {
  let component: BoardScoreComponent;
  let fixture: ComponentFixture<BoardScoreComponent>;
  let store: MockStore<GameState>;
  let mockUsernameSelector: MemoizedSelectorWithProps<GameState, GAME_STATUS, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardScoreComponent, ],
      imports : [ NgLetModule, CountdownModule],
      providers: [provideMockStore(), ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardScoreComponent);
    component = fixture.componentInstance;
    store = TestBed.get( Store );
    mockUsernameSelector = store.overrideSelector(
      gameStatus,
      true
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
