import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {
  Link,
  NavigationService,
} from './navigation.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  AuthService,
  UserData,
} from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent
  implements OnInit
{
  links!: Observable<Link[]>;
  user$!: Observable<UserData>;
  nav: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.links =
      this.navigationService.getLinks();

    this.user$ = this.authService.user$;
  }

  showNav() {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authService.closeSubs();
  }
}
