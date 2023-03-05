import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeFormComponent } from './home-form.component';
import {
  AuthService,
  BackendRes,
} from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';
import {
  NO_ERRORS_SCHEMA,
  ViewContainerRef,
} from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('Testing HomeForm Component', () => {
  let fixture: ComponentFixture<HomeFormComponent>;
  let component: HomeFormComponent;
  let authService: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFormComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ToastService,
          useValue: {
            viewContainerRef: ViewContainerRef,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      HomeFormComponent
    );
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    httpController = TestBed.inject(
      HttpTestingController
    );
    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should have isRegisterFom as false defaulty and toggle it to opposite value', (dn: DoneFn) => {
      expect(
        component.isRegisterForm
      ).toBeFalse();

      component.onToggle();
      expect(component.isRegisterForm).toBeTrue();
      dn();
    });

    it('Should be valid if all inputs are filled in', (dn: DoneFn) => {
      component.onToggle();

      for (let control of Object.values(
        component.form.controls
      )) {
        control.setValue('test@test.com');
      }

      expect(component.form.valid).toBeTruthy();
      dn();
    });

    it('Should signup user if all inputs are valid and is switched on registration', (dn: DoneFn) => {
      const spyOnSubmit = spyOn(
        component,
        'onSubmit'
      );

      component.ngOnInit();
      !component.isRegisterForm &&
        component.onToggle();

      for (let control of Object.values(
        component.form.controls
      )) {
        control.setValue('test@test');
      }

      component.onSubmit();

      expect(spyOnSubmit).toHaveBeenCalledTimes(
        1
      );
      dn();
    });

    it('Should invoke sign in function if all inputs are valid and form was switched on login panel', (dn: DoneFn) => {
      const spyOnSubmit = spyOn(
        component,
        'onSubmit'
      );

      component.isRegisterForm &&
        component.onToggle();

      for (let control of Object.values(
        component.form.controls
      )) {
        control.setValue('test@test');
      }

      component.onSubmit();

      expect(spyOnSubmit).toHaveBeenCalledTimes(
        1
      );
      dn();
    });
  });

  describe('DOM Tests', () => {
    it('Should render correctly', () => {
      expect(component).toBeDefined();
    });

    it('Should exactly return 3 inputs', () => {
      fixture.detectChanges();

      const inputs =
        fixture.debugElement.queryAll(
          By.css('input')
        );

      expect(inputs.length).toEqual(3);
    });

    it('Should render one submitting button', () => {
      const btn = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;

      expect(btn).toBeDefined();
    });
  });
});
