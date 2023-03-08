import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { PasswordFormComponent } from './password-form.component';
import { PasswordFormService } from './password-form.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Testing PasswordForm Component', () => {
  let fixture: ComponentFixture<PasswordFormComponent>;
  let component: PasswordFormComponent;

  let service: PasswordFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordFormComponent],
      providers: [PasswordFormService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      PasswordFormComponent
    );
    component = fixture.componentInstance;
    service = TestBed.inject(PasswordFormService);

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should obtained fields from service', () => {
      expect(
        component.passwordInputs
      ).toBeDefined();
    });

    it('Should initialiazed form', () => {
      expect(
        component.passwordForm
      ).toBeDefined();
    });

    it('Should compare two passwords and return exact flag', () => {
      const newPassword = 'test';
      let confirmingPassword = 'test1';

      component.passwordForm.controls[
        'newPassword'
      ].setValue(newPassword);
      component.passwordForm.controls[
        'confirmPassword'
      ].setValue(confirmingPassword);
      expect(
        component.comparePasswords()
      ).toBeFalse();

      confirmingPassword = newPassword;
      component.passwordForm.controls[
        'confirmPassword'
      ].setValue(confirmingPassword);
      expect(
        component.comparePasswords()
      ).toBeTrue();
    });

    it('Should set class accordingly to control value, state and result of comparePasswords function', () => {
      //untouched and clean control
      component.passwordForm.controls[
        'confirmPassword'
      ].markAsUntouched();

      const input = component.passwordInputs.find(
        (input) =>
          input.formControl === 'confirmPassword'
      )!;

      expect(
        component.setInvalidClass(input)
      ).toBeFalsy();

      //Passwords differ
      const newPassword = 'test';

      component.passwordForm.controls[
        'newPassword'
      ].setValue(newPassword);
      component.passwordForm.controls[
        'confirmPassword'
      ].setValue(newPassword.toUpperCase());

      component.passwordForm.controls[
        'confirmPassword'
      ].markAsDirty();
      component.passwordForm.controls[
        'confirmPassword'
      ].markAsTouched();

      expect(
        component.setInvalidClass(input)
      ).toEqual('is-invalid');

      //Passwords are equaled
      component.passwordForm.controls[
        'confirmPassword'
      ].setValue(newPassword);
      expect(
        component.setInvalidClass(input)
      ).toEqual('is-valid');
    });

    it('Should toggle visibility', () => {
      for (let inputPassword of Object.values(
        component.passwordInputs
      )) {
        expect(inputPassword.hidden).toBeTrue();
        component.onToggleVisibility(
          inputPassword.formControl
        );
        expect(inputPassword.hidden).toBeFalse();
      }
    });

    it('Should emit value', () => {
      const spy = spyOn(
        component.passwordEmitter,
        'emit'
      );
      component.onSubmitPassword();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render number of inputs equals exactly number of service passed objects', () => {
      fixture.detectChanges();

      const inputs =
        fixture.debugElement.queryAll(
          By.css('input')
        );

      expect(inputs.length).toEqual(
        service.getPasswordFields().length
      );
    });

    it('Should render icons for whole-redered inputs', () => {
      fixture.detectChanges();
      const spy = spyOn(
        component,
        'onToggleVisibility'
      );

      const buttonsWithIcons =
        fixture.debugElement.queryAll(
          By.css('button>i')
        );

      expect(buttonsWithIcons.length).toEqual(
        service.getPasswordFields().length
      );

      for (let button of buttonsWithIcons) {
        (
          button.nativeElement as HTMLButtonElement
        ).click();
      }

      expect(spy).toHaveBeenCalledTimes(3);
    });

    it('Should undisable btn if all inputs of form are filled up', () => {
      const spy = spyOn(
        component.passwordEmitter,
        'emit'
      );
      fixture.detectChanges();

      const submitButton =
        fixture.debugElement.query(
          By.css('button[type="submit"]')
        ).nativeElement as HTMLButtonElement;

      expect(submitButton).toBeDefined();
      expect(
        component.passwordForm.valid
      ).toBeFalse();

      for (let control of Object.values(
        component.passwordForm.controls
      )) {
        control.setValue('test');
        control.markAsTouched();
        control.markAsDirty();
      }
      fixture.detectChanges();

      expect(
        component.passwordForm.valid
      ).toBeTrue();
      expect(submitButton.disabled).toBeFalse();
    });
  });
});
