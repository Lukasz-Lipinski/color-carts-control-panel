import {
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
import { Observable, map } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastDirective } from '../components/toast/toast.directive';
import { ToastService } from '../components/toast/toast.service';

export interface UserFormProps {
  email: FormControl<string>;
}

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UserDataComponent implements OnInit {
  userData!: Observable<UserData>;
  userForm!: FormGroup<UserFormProps>;
  @ViewChild(ToastDirective)
  toast!: ToastDirective;

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
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

  onSaveNewPassword(passwords: {
    newPassword: string;
    currPassword: string;
  }) {
    this.authService
      .setNewPassword(passwords)
      .subscribe({
        next: (res) =>
          this.toastService.createComponent(
            this.toast,
            res
          ),
      });
  }
}
