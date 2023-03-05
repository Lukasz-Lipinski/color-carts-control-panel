import { Injectable } from '@angular/core';
import {
  CanMatch,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanMatch {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user$.pipe(
      map(
        (user) =>
          user.isLogged ||
          this.router.createUrlTree([''])
      )
    );
  }
}
