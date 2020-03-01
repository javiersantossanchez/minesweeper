import { SquareComponent } from './components/square/square.component';
import { BoardGameComponent } from './components/board-game/board-game.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { GameState } from './dtos/game-state';



describe('AppComponent', () => {
  let store: MockStore<GameState>;
  const initialState: GameState = { gameBoard: [[],[],[]], gameBoardLength: 0, availableMarks: 0, installedMines: 0};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        SquareComponent,
        BoardGameComponent
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
