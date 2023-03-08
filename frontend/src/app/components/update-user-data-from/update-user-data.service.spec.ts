/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UpdateUserDataService } from './update-user-data.service';

describe('Service: UpdateUserData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateUserDataService]
    });
  });

  it('should ...', inject([UpdateUserDataService], (service: UpdateUserDataService) => {
    expect(service).toBeTruthy();
  }));
});
