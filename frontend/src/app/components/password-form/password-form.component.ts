import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  selector: 'app-password-form[disabled]',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent {
  passwordForm!: FormGroup<PasswordFormProps>;
  passwordInputs!: PasswordFields[];
  @Input() disabled!: boolean;
  @Output() passwordEmitter = new EventEmitter<{
    newPassword: string;
    currPassword: string;
  }>();

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

  onSubmitPassword() {
    this.passwordEmitter.emit({
      newPassword:
        this.passwordForm.controls['newPassword']
          .value,
      currPassword:
        this.passwordForm.controls['oldPassword']
          .value,
    });
  }

  onToggleVisibility(control: string) {
    this.passwordInputs.forEach((input) => {
      if (input.formControl === control)
        input.hidden = !input.hidden;
    });
  }
}
