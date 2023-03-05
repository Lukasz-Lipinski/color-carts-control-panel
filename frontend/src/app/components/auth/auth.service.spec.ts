import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { mockedUser } from 'src/app/mocks';

describe('Testing AuthService', () => {
  let service: AuthService;
  let controller: HttpTestingController;
  const registerURL = '/api/users/registration';
  const loginURL = '/api/users/login';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    controller = TestBed.inject(
      HttpTestingController
    );
  });

  describe('Class Tests', () => {
    it('Should register new user and respond with status 200', (dn: DoneFn) => {
      service.signup(mockedUser).subscribe({
        next: (res) => {
          expect(res.status).toEqual(200);
          expect(res.msg).toBeTruthy();
          dn();
        },
      });
      controller
        .expectOne(service.url + registerURL)
        .flush({
          status: 200,
          msg: 'done',
        });
    });
  });

  it('Should sign in user and respond with status 200', (dn: DoneFn) => {
    service.signin(mockedUser).subscribe({
      next: (res) => {
        expect(res.status).toEqual(200);
        expect(res.msg).toBeTruthy();
        dn();
      },
    });

    controller
      .expectOne(service.url + loginURL)
      .flush({
        msg: 'successfully',
        status: 200,
      });
  });

  it('Should have no filled in user data at the start', (dn: DoneFn) => {
    service.user$.subscribe({
      next: (userDataAtTheStart) => {
        for (let data of Object.values(
          userDataAtTheStart
        )) {
          expect(data).toBeFalsy();
        }

        dn();
      },
    });
  });

  it('Should set user accordingly to his data', (dn: DoneFn) => {
    service.setUser(mockedUser);

    service.user$.subscribe({
      next: (userData) => {
        for (let index in Object.keys(userData)) {
          if (
            +index ===
            Object.keys(userData).length - 1
          ) {
            expect(
              Object.entries(userData)[index][1]
            ).toBeTrue();
          } else {
            expect(
              Object.entries(userData)[index][1]
            ).toEqual(
              Object.entries(mockedUser)[index][1]
            );
          }
        }
      },
    });

    dn();
  });
});
