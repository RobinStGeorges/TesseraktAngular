import { TestBed } from '@angular/core/testing';

import { ExerciceService } from './exercice.service';

describe('ExerciceService', () => {
  let service: ExerciceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciceService);
  });
});
