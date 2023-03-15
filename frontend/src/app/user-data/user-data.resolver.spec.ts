import { TestBed } from '@angular/core/testing';
import { UserDataResolver } from './user-data.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../components/auth/auth.service';

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
