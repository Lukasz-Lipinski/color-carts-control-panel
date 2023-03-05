import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  BackendRes,
  NewUser,
} from '../auth/auth.service';
import { ToastDirective } from '../toast/toast.directive';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';
import { concatMap, of, switchMap } from 'rxjs';

interface FormProps {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

interface Field {
  label: string;
  placeholder: string;
}

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss'],
})
export class HomeFormComponent implements OnInit {
  form!: FormGroup;
  isRegisterForm = false;

  @ViewChild(ToastDirective, { static: true })
  toast!: ToastDirective;

  fields: Field[] = [
    { label: 'name', placeholder: 'Your name' },
    { label: 'email', placeholder: 'Your email' },
    {
      label: 'password',
      placeholder: 'Your password',
    },
  ];

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup<FormProps>({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
        ],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(5),
        ],
      }),
    });
  }
  onToggle() {
    this.isRegisterForm = !this.isRegisterForm;
  }

  getError(label: string) {
    return this.form.controls[label].errors;
  }

  isTouchedAndDirty(label: string): boolean {
    return (
      this.form.controls[label].touched &&
      this.form.controls[label].dirty
    );
  }

  onSubmit() {
    let newUser: NewUser = {
      email: '',
      name: '',
      password: '',
    };

    for (let controlName in this.form.controls) {
      Object.defineProperty(
        newUser,
        controlName,
        {
          value:
            this.form.controls[controlName].value,
        }
      );
    }

    this.form.valid &&
      this.isRegisterForm &&
      this.authService.signup(newUser).subscribe({
        next: (res) => {
          this.toastService.createComponent(
            this.toast,
            res
          ),
            res.status === 200 &&
              this.authService.setUser({
                ...newUser,
              });
          res.status === 200 &&
            this.router.navigate(['/dashboard']);
        },
      });

    this.form.valid &&
      !this.isRegisterForm &&
      this.authService.signin(newUser).subscribe({
        next: (res) => {
          this.toastService.createComponent(
            this.toast,
            res
          ),
            res.status === 200 &&
              this.authService.setUser({
                ...newUser,
              });
          res.status === 200 &&
            this.router.navigate(['/dashboard']);
        },
      });
  }

  ngOnDestroy() {}
}
