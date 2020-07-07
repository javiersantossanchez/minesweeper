import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BoardScoreComponent } from './board-score.component';
import { CountdownModule } from 'ngx-countdown';
import { NgLetModule } from '@ngrx-utils/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GameState, GAME_STATUS} from 'src/app/dtos/game-state';
import { MemoizedSelectorWithProps, MemoizedSelector, Store} from '@ngrx/store';
import { gameStatus } from 'src/app/selectors';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BoardScoreState } from 'src/app/dtos/board-score-state';
import { BoardGameService } from 'src/app/services/def/board-game.service';
import { ConfigurationService } from 'src/app/services/impl/configuration.service';
import { of } from 'rxjs/internal/observable/of';

describe('BoardScoreComponent', () => {
  let component: BoardScoreComponent;
  let fixture: ComponentFixture<BoardScoreComponent>;
  let store: MockStore<GameState>;
  let mockUsernameSelector: MemoizedSelectorWithProps<GameState, GAME_STATUS, boolean>;

  const service = jasmine.createSpyObj('GenericService', ['getBoardScore', 'isPlaying', ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardScoreComponent, ],
      imports : [ NgLetModule, CountdownModule, FontAwesomeModule, FormsModule, ],
      providers: [provideMockStore(), { provide: BoardGameService, useValue:  service}, ConfigurationService],
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

    const c: BoardScoreState = {availableMarks: 4, installedMines: 4, playing: true, lose: false, numberOfOpenMines: 0, win: false};

    service.getBoardScore.and.returnValue(of(c));
    service.isPlaying.and.returnValue(of(true));
    //tick();


    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
});
