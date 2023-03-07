<<<<<<< HEAD
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> f0d308aac9b804ccf526157c009724690438558a
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  PasswordFields,
  PasswordFormService,
} from './password-form.service';

export interface PasswordFormProps {
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
  oldPassword: FormControl<string>;
  [key: string]: FormControl<any>;
}

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent
  implements OnInit
{
  passwordForm!: FormGroup<PasswordFormProps>;
  passwordInputs!: PasswordFields[];
<<<<<<< HEAD
  @Output() passwordEmitter =
    new EventEmitter<string>();
=======
>>>>>>> f0d308aac9b804ccf526157c009724690438558a

  constructor(
    private passwordFormService: PasswordFormService
  ) {}

  ngOnInit(): void {
    this.passwordInputs =
      this.passwordFormService.getPasswordFields();

    this.passwordForm = new FormGroup({
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      oldPassword: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  comparePasswords() {
    const { confirmPassword, newPassword } =
      this.passwordForm.controls;

    return (
      confirmPassword.value !== '' &&
      newPassword.value !== '' &&
      confirmPassword.value === newPassword.value
    );
  }

  setInvalidClass(passInput: PasswordFields) {
    if (
      !this.comparePasswords() &&
      this.passwordForm.controls[
        passInput.formControl
      ].dirty &&
      this.passwordForm.controls[
        passInput.formControl
      ].touched
    )
      return 'is-invalid';

    if (
      this.comparePasswords() &&
      this.passwordForm.controls[
        passInput.formControl
      ].dirty &&
      this.passwordForm.controls[
        passInput.formControl
      ].touched
    )
      return 'is-valid';

    return '';
  }

<<<<<<< HEAD
  onSubmitPassword() {
    this.passwordEmitter.emit(
      this.passwordForm.controls['newPassword']
        .value
    );
  }
=======
  onSubmitPassword() {}
>>>>>>> f0d308aac9b804ccf526157c009724690438558a

  onToggleVisibility(control: string) {
    this.passwordInputs.forEach((input) => {
      if (input.formControl === control)
        input.hidden = !input.hidden;
    });
  }
}
