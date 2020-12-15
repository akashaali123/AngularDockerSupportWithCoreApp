import { TestBed } from '@angular/core/testing';

import { ExperienceLevelService } from './experience-level.service';

describe('ExperienceLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperienceLevelService = TestBed.get(ExperienceLevelService);
    expect(service).toBeTruthy();
  });
});
