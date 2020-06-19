import { TestBed } from '@angular/core/testing';

import { CoursDataService } from './cours-data.service';

describe('CoursDataService', () => {
  let service: CoursDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
