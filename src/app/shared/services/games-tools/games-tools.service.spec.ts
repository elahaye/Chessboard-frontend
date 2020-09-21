import { TestBed } from '@angular/core/testing';

import { GamesToolsService } from './games-tools.service';

describe('GamesToolsService', () => {
  let service: GamesToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
