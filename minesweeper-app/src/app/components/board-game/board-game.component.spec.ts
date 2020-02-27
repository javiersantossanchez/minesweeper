import { SquareComponent } from './../square/square.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { BoardGameComponent } from './board-game.component';
import { BoardDto } from 'src/app/dtos/board-dto';

describe('BoardGameComponent', () => {
  let component: BoardGameComponent;
  let fixture: ComponentFixture<BoardGameComponent>;
  let store: MockStore<BoardDto>;
  const initialState: BoardDto = { gameBoard: [[],[],[]],gameBoardLength: 0};

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
