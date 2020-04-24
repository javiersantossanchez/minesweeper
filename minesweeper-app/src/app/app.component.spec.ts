import { BoardScoreComponent } from './components/board-score/board-score.component';
import { SquareComponent } from './components/square/square.component';
import { BoardGameComponent } from './components/board-game/board-game.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { GameState, GAME_STATUS } from './dtos/game-state';
import { NgLetModule } from '@ngrx-utils/store';
import { CountdownModule } from 'ngx-countdown';



describe('AppComponent', () => {
  let store: MockStore<GameState>;
  const initialState: GameState = { gameBoard: [[],[],[]], gameBoardLength: 0, availableMarks: 0, installedMines: 0, numberOfOpenMines: 0,gameStatus: GAME_STATUS.PLAYING};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CountdownModule,
        NgLetModule
      ],
      declarations: [
        AppComponent,
        SquareComponent,
        BoardGameComponent,
        BoardScoreComponent,
      ],
      providers: [provideMockStore({ initialState }), ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    store = TestBed.get(Store);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
