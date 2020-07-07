import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { SquareComponent } from './square.component';
import { GameState, GAME_STATUS, } from 'src/app/dtos/game-state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelectorWithProps, Store } from '@ngrx/store';
import { SquareState } from 'src/app/dtos/square-state-dto';
import { squareStatusSelector } from 'src/app/selectors';
import { NgLetModule } from '@ngrx-utils/store';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BoardGameService } from 'src/app/services/def/board-game.service';
import { of } from 'rxjs';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;
  const service = jasmine.createSpyObj('GenericService', ['getSquareStatus', ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareComponent ],
      providers: [{ provide: BoardGameService, useValue:  service}, ],
      imports : [ NgLetModule, FontAwesomeModule, FormsModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    const s: SquareState = {

      isClosed: true,

      isOpen: false,

      isMine: false,

      numberOfMinesAround: 0,

      isMarked: false,

      isBroken: false,

    };

    service.getSquareStatus.and.returnValue(of(s));
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));



  it('a square closed show the right element ', fakeAsync(() => {
    const s: SquareState = {
      isClosed: true,
      isOpen: false,
      isMine: false,
      numberOfMinesAround: 0,
      isMarked: true,
      isBroken: false,
    };

    component.isPlaying = true;
    component.rowIndex = 0;
    component.columnIndex = 0;

    service.getSquareStatus.and.returnValue(of(s));
    fixture.detectChanges();
    flush();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const p: HTMLButtonElement = bannerElement.querySelector('#closeSquare-' + component.rowIndex + '-' + component.columnIndex);
    expect(p).toBeTruthy();
  }));


  it('a square open show the right element ', fakeAsync(() => {
    const s: SquareState = {
      isClosed: false,
      isOpen: true,
      isMine: false,
      numberOfMinesAround: 0,
      isMarked: true,
      isBroken: false,
    };

    component.isPlaying = true;
    component.rowIndex = 0;
    component.columnIndex = 0;

    service.getSquareStatus.and.returnValue(of(s));
    fixture.detectChanges();
    flush();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const p: HTMLButtonElement = bannerElement.querySelector('#openSquare-' + component.rowIndex + '-' + component.columnIndex);

    expect(p).toBeTruthy();
  }));


  it('When game is over and square is closed show the right element ', fakeAsync(() => {
    const s: SquareState = {
      isClosed: true,
      isOpen: false,
      isMine: false,
      numberOfMinesAround: 0,
      isMarked: false,
      isBroken: false,
    };

    component.isPlaying = false;
    component.rowIndex = 0;
    component.columnIndex = 0;

    service.getSquareStatus.and.returnValue(of(s));
    fixture.detectChanges();
    flush();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const p: HTMLButtonElement = bannerElement.querySelector('#generalSquare-' + component.rowIndex + '-' + component.columnIndex);

    expect(p).toBeTruthy();
  }));

});
