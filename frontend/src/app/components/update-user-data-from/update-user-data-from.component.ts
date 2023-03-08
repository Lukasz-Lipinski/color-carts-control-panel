import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  UpdateUserDataService,
  UpdateUserFormProps,
} from './update-user-data.service';
import { AuthService } from '../auth/auth.service';

interface UpdateUserDataFormProps {
  email: FormControl<string>;
  name: FormControl<string>;
  confirmingPassword: FormControl<string>;
}

@Component({
  selector: 'app-update-user-data-from',
  templateUrl:
    './update-user-data-from.component.html',
  styleUrls: [
    './update-user-data-from.component.scss',
  ],
})
export class UpdateUserDataFromComponent
  implements OnInit
{
  updateUserDataForm!: FormGroup<UpdateUserDataFormProps>;
  updateUserDataFormFields!: UpdateUserFormProps[];

  constructor(
    private updateUserDataService: UpdateUserDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateUserDataFormFields =
      this.updateUserDataService.getUpdateUserFields();

    this.authService.user$.subscribe({
      next: (user) => {
        this.updateUserDataForm =
          new FormGroup<UpdateUserDataFormProps>({
            name: new FormControl(user.name, {
              nonNullable: true,
              validators: [Validators.required],
            }),
            email: new FormControl(user.email, {
              nonNullable: true,
              validators: [
                Validators.required,
                Validators.email,
              ],
            }),
            confirmingPassword: new FormControl(
              '',
              {
                nonNullable: true,
                validators: [Validators.required],
              }
            ),
          });
      },
    });
  }

  onSubmit() {
    const { confirmingPassword, email, name } =
      this.updateUserDataForm.controls;

    console.log(confirmingPassword, email, name);
  }
}
