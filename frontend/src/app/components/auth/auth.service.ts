import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  switchMap,
} from 'rxjs';
import {
  Injectable,
  isDevMode,
} from '@angular/core';
import { environment as DevEnv } from 'src/environments/environment';
import { environment as ProdEnv } from 'src/environments/environment.prod';
import { UserDataEmitterProps } from '../update-user-data-from/update-user-data-from.component';

export interface NewUser {
  email: string;
  password: string;
  name: string;
}

export interface BackendRes {
  msg: string;
  status: number;
}

export interface UserData {
  isLogged: boolean;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = isDevMode()
    ? DevEnv.BACKEND_API
    : location.origin;

  user$ = new BehaviorSubject<UserData>({
    isLogged: false,
    name: '',
    email: '',
  });

  constructor(private http: HttpClient) {}

  signup(user: NewUser): Observable<BackendRes> {
    return this.http
      .post<BackendRes>(
        `${this.url}/api/users/registration`,
        user
      )
      .pipe(
        catchError((err: BackendRes) => of(err))
      );
  }

  signin(user: NewUser): Observable<BackendRes> {
    return this.http
      .post<BackendRes>(
        `${this.url}/api/users/login`,
        user
      )
      .pipe(catchError((err) => of(err)));
  }

  setUser(
    loggedUser: Omit<UserData, 'isLogged'>
  ) {
    this.user$.next({
      ...loggedUser,
      isLogged: true,
    });
  }

  logout() {
    this.user$.next({
      email: '',
      isLogged: false,
      name: '',
    });
  }

  setNewPassword(passwords: {
    newPassword: string;
    currPassword: string;
  }): Observable<BackendRes> {
    return this.user$.pipe(
      switchMap((user) => {
        return this.http.put<BackendRes>(
          this.url + '/api/users/update/password',
          {
            ...passwords,
            user: {
              name: user.name,
              email: user.email,
            },
          }
        );
      })
    );
  }

  updateUserData(data: {
    user: UserData;
    newData: UserDataEmitterProps;
  }): Observable<BackendRes> {
    const { newData, user } = data;

    interface BodyReq {
      user: Omit<UserData, 'isLogged'>;
      newData: Omit<UserData, 'isLogged'>;
      password: string;
    }

    const body: BodyReq = {
      user: {
        email: user.email,
        name: user.name,
      },
      newData: newData.newData,
      password: newData.confirmingPassword,
    };

    return this.http.put<BackendRes>(
      this.url + '/api/users/update/user-data',
      body
    );
  }

  closeSubs() {
    this.user$.next({
      email: '',
      isLogged: false,
      name: '',
    });
    this.user$.complete();
  }
}
