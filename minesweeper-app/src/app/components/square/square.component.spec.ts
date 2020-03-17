import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareComponent } from './square.component';
import { GameState, GAME_STATUS } from 'src/app/dtos/game-state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelectorWithProps, Store } from '@ngrx/store';
import { SquareState } from 'src/app/dtos/square-state-dto';
import { squareStatusSelector } from 'src/app/selectors';
import { NgLetModule } from '@ngrx-utils/store';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;
  let store: MockStore<GameState>;
  let mockUsernameSelector: MemoizedSelectorWithProps<GameState, {
    row: number;
    column: number;
  }, SquareState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareComponent ],
      providers: [provideMockStore(), ],
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

 // it('should create', () => {
 //   expect(component).toBeTruthy();
 // });

 // it('Is created with status closed as default value', () => {
 //    expect(component.isClosed()).toBeTruthy();

  //});

});
