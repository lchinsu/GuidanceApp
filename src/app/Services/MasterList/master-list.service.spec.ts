import { TestBed } from '@angular/core/testing';

import { MasterListService } from './master-list.service';

describe('MasterListService', () => {
  let service: MasterListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
