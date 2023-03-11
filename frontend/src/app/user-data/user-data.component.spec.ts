import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { UserDataComponent } from './user-data.component';
import {
  AuthService,
  UserData,
} from '../components/auth/auth.service';
import { ToastService } from '../components/toast/toast.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import {
  mockedEmitterData,
  mockedRes,
  mockedUser,
  mockedUserData,
} from '../mocks';
import { UserDataEmitterProps } from '../components/update-user-data-from/update-user-data-from.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ToastDirective } from '../components/toast/toast.directive';
import { ToastComponent } from '../components/toast/toast.component';
import { DebugElement } from '@angular/core';

describe('Testing User Data Component', () => {
  let fixture: ComponentFixture<UserDataComponent>;
  let component: UserDataComponent;
  let controller: HttpTestingController;

  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UserDataComponent,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            user$: of(mockedUser),
            updateUserData: () => of(mockedRes),
            setNewPassword: (pass: string) =>
              of(mockedRes),
          },
        },
        ToastService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              userData: mockedUserData,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      UserDataComponent
    );
    component = fixture.componentInstance;
    controller = TestBed.inject(
      HttpTestingController
    );

    component.ngOnInit();
    fixture.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should take data accordingly to an activated route', (dn: DoneFn) => {
      component.userData.subscribe({
        next: (data) => {
          for (let index in Object.values(data)) {
            expect(
              Object.values(data)[index]
            ).toEqual(
              Object.values(mockedUserData)[index]
            );
          }
          dn();
        },
      });
    });

    it('Should initialized form during ngOnInit', () => {
      expect(component.userForm).toBeDefined();
    });

    it('Should unblock update user form', () => {
      component.disabledForms.disabledUserDataForm =
        true;

      component.onSaveUserData(mockedEmitterData);
      expect(
        component.disabledForms
          .disabledUserDataForm
      ).toBeFalse();
    });

    it('Should unblock password form', () => {
      component.disabledForms.disabledPasswordForm =
        true;

      component.onSaveNewPassword({
        currPassword: 'test',
        newPassword: 'test1234',
      });
      expect(
        component.disabledForms
          .disabledPasswordForm
      ).toBeFalse();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should display toast if onSaveNewPassword was invoked and a res has been delivered', () => {
      let toast: HTMLDivElement | undefined =
        fixture.debugElement.query(
          By.css('div.toast')
        )?.nativeElement;
      expect(toast).toBeUndefined();

      component.onSaveNewPassword({
        currPassword: 'test',
        newPassword: 'test1',
      });

      fixture.detectChanges();
      toast = fixture.debugElement.query(
        By.css('div.toast')
      ).nativeElement as HTMLDivElement;
      expect(toast).toBeDefined();
    });
  });

  it('Should display toast if onSaveUserData was invoked and a res has been delivered', () => {
    let toast: HTMLDivElement | undefined =
      fixture.debugElement.query(
        By.css('div.toast')
      )?.nativeElement;
    expect(toast).toBeUndefined();

    component.onSaveUserData(mockedEmitterData);
    fixture.detectChanges();

    console.log(toast);
    // toast = fixture.debugElement.query(
    //   By.css('div.toast')
    // )?.nativeElement;
    // expect(toast).toBeDefined();
  });
});
