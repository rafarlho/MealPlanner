import { TestBed } from '@angular/core/testing';

import { PlannerDialogService } from './planner-dialog-service.service';

describe('PlannerDialogService', () => {
  let service: PlannerDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlannerDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
