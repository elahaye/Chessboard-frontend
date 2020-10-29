import { TestBed } from '@angular/core/testing';

import { PlaysService } from './plays.service';

describe('PlaysService', () => {
  let service: PlaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
