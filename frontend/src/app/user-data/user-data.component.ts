import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import {
  AuthService,
  UserData,
} from '../components/auth/auth.service';
import { Observable, map, switchMap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastDirective } from '../components/toast/toast.directive';
import { ToastService } from '../components/toast/toast.service';
import { UserDataEmitterProps } from '../components/update-user-data-from/update-user-data-from.component';

export interface UserFormProps {
  email: FormControl<string>;
}

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
  standalone: true,
  imports: [SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDataComponent implements OnInit {
  userData!: Observable<UserData>;
  userForm!: FormGroup<UserFormProps>;
  disabledForms = {
    disabledUserDataForm: false,
    disabledPasswordForm: false,
  };
  @ViewChild(ToastDirective)
  toast!: ToastDirective;

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userData = this.activatedRoute.data.pipe(
      map(({ userData }) => {
        return userData;
      })
    );

    this.userForm = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onSaveUserData(newData: UserDataEmitterProps) {
    this.disabledForms = {
      ...this.disabledForms,
      disabledUserDataForm: true,
    };

    this.authService.user$
      .pipe(
        switchMap((user) => {
          return this.authService.updateUserData({
            user,
            newData,
          });
        })
      )
      .subscribe({
        next: (res) => {
          this.disabledForms = {
            ...this.disabledForms,
            disabledUserDataForm: false,
          };
          this.toastService.createComponent(
            this.toast,
            res
          );
          this.cdr.markForCheck();
        },
      });
  }

  onSaveNewPassword(passwords: {
    newPassword: string;
    currPassword: string;
  }) {
    this.disabledForms = {
      ...this.disabledForms,
      disabledPasswordForm: true,
    };
    this.authService
      .setNewPassword(passwords)
      .subscribe({
        next: (res) => {
          this.toastService.createComponent(
            this.toast,
            res
          );

          this.disabledForms = {
            ...this.disabledForms,
            disabledPasswordForm: false,
          };
          this.cdr.markForCheck();
        },
      });
  }
}
