import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { AppEffects } from './app.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GameState, GAME_STATUS} from './dtos/game-state';
import { Store } from '@ngrx/store';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;
  let store: MockStore<GameState>;
  const initialState: GameState = { gameBoard: [[],[],[]], gameBoardLength: 0, availableMarks: 0, installedMines: 0, numberOfOpenMines: 0,gameStatus: GAME_STATUS.PLAYING};


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.get<AppEffects>(AppEffects);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
