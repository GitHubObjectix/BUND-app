import { TestBed } from '@angular/core/testing';

import { NistkastenService } from './nistkasten.service';

describe('NistkastenService', () => {
  let service: NistkastenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NistkastenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
