import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { UserDataResolver } from './user-data.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  AuthService,
  UserData,
} from '../components/auth/auth.service';
import { of } from 'rxjs';

describe('Testing UserData Resolver', () => {
  let resolver: UserDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    resolver = TestBed.inject(UserDataResolver);
  });

  describe('Class Tests', () => {
    it('Should be rendered', () => {
      expect(resolver).toBeDefined();
    });
  });
});
