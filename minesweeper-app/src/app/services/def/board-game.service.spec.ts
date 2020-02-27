import { TestBed } from '@angular/core/testing';

import { BoardGameService } from './board-game.service';

describe('BoardGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardGameService = TestBed.get(BoardGameService);
    expect(service).toBeTruthy();
  });
});
