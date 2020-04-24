import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SquareComponent } from './square.component';
import { GameState, GAME_STATUS, } from 'src/app/dtos/game-state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelectorWithProps, Store } from '@ngrx/store';
import { SquareState } from 'src/app/dtos/square-state-dto';
import { squareStatusSelector } from 'src/app/selectors';
import { NgLetModule } from '@ngrx-utils/store';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;
  let store: MockStore<GameState>;
  let mockUsernameSelector: MemoizedSelectorWithProps<GameState, {
    row: number;
    column: number;
  }, SquareState>;

  const initialState: GameState = { gameBoard: [[],[],[]],
    gameBoardLength: 0, availableMarks: 0, installedMines: 0, numberOfOpenMines: 0,gameStatus: GAME_STATUS.PLAYING};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareComponent ],
      providers: [provideMockStore({initialState}), ],
      imports : [ NgLetModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    store = TestBed.get( Store );
    const value: SquareState = {
      isClosed: true,
      isOpen: false,
      isMine: true,
      numberOfMinesAround: 0,
      isMarked: true,
      isBroken: false};
    mockUsernameSelector = store.overrideSelector(
      squareStatusSelector,
      value
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('The square has numberOfMinesAround property with value higher than zero', () => {
  //   const value: SquareState = {
  //     isClosed: true,
  //     isOpen: false,
  //     isMine: true,
  //     numberOfMinesAround: 1,
  //     isMarked: true,
  //     isBroken: false
  //   };

  //   mockUsernameSelector.setResult(value);
  //   store.refreshState();
  //   fixture.detectChanges();
  //   const bannerElement: HTMLElement = fixture.nativeElement;
  //   const p = bannerElement.querySelector('open-square');
  //   console.log(p);

  //   //expect(h1.textContent).toContain('10');

  // });

});
