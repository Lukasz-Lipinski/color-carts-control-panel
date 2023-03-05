import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import {
  AuthService,
  UserData,
} from '../components/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataResolver
  implements Resolve<UserData>
{
  constructor(private authService: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | UserData
    | Observable<UserData>
    | Promise<UserData> {
    return this.authService.user$;
  }
}
