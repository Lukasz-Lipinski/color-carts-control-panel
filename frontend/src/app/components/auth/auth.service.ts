import {
  HttpBackend,
  HttpClient,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
} from 'rxjs';
import {
  Injectable,
  isDevMode,
} from '@angular/core';
import { environment as DevEnv } from 'src/environments/environment';
import { environment as ProdEnv } from 'src/environments/environment.prod';

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
    : ProdEnv.BACKEND_API;

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

  isLogged$() {
    return of(true);
  }

  setNewPassword(
    newPassword: string
  ): Observable<BackendRes> {
    return this.http.patch<BackendRes>(
      this.url + '/api/users/update',
      { newPassword }
    );
  }
}
