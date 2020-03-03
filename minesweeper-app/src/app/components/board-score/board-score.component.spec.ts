import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardScoreComponent } from './board-score.component';

describe('BoardScoreComponent', () => {
  let component: BoardScoreComponent;
  let fixture: ComponentFixture<BoardScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
