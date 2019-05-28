import { TestBed } from '@angular/core/testing';

import { FormHandleService } from './form-handle.service';

describe('FormHandleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormHandleService = TestBed.get(FormHandleService);
    expect(service).toBeTruthy();
  });
});
