import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  UpdateUserDataService,
  UpdateUserFormProps,
} from './update-user-data.service';
import {
  AuthService,
  UserData,
} from '../auth/auth.service';

interface UpdateUserDataFormProps {
  email: FormControl<string>;
  name: FormControl<string>;
  confirmingPassword: FormControl<string>;
}

export interface UserDataEmitterProps {
  newData: Omit<UserData, 'isLogged'>;
  confirmingPassword: string;
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
  protected updateUserDataForm!: FormGroup<UpdateUserDataFormProps>;
  protected updateUserDataFormFields!: UpdateUserFormProps[];
  @Output() userDataEmitter =
    new EventEmitter<UserDataEmitterProps>();

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
    let emittingVal: UserDataEmitterProps = {
      confirmingPassword: '',
      newData: {
        email: '',
        name: '',
      },
    };

    for (let control in this.updateUserDataForm
      .controls) {
      control !== 'confirmingPassword' &&
        Object.defineProperty(
          emittingVal.newData,
          control,
          {
            value:
              this.updateUserDataForm.controls[
                control as keyof UpdateUserDataFormProps
              ].value,
          }
        );

      control === 'confirmingPassword' &&
        Object.defineProperty(
          emittingVal,
          control,
          {
            value:
              this.updateUserDataForm.controls[
                control as keyof UpdateUserDataFormProps
              ].value,
          }
        );
    }

    this.userDataEmitter.emit(emittingVal);
  }
}
