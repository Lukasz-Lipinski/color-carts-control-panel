import { TestBed } from '@angular/core/testing';
import { DashboardGuard } from './dashboard.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../components/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Testing Dashboard Guard', () => {
  let guard: DashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            users$: of({ isLogged: true }),
          },
        },
      ],
    });
    guard = TestBed.inject(DashboardGuard);
  });

  it('Should be rendered', () => {
    expect(guard).toBeDefined();
  });
});
