import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthService,
  UserData,
} from '../auth/auth.service';
import {
  Link,
  NavigationService,
} from './navigation.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import {
  mockedUserData,
  mockedLinks,
} from 'src/app/mocks';

describe('Testing Navigation Component', () => {
  let fixture: ComponentFixture<NavigationComponent>;
  let component: NavigationComponent;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient,
        {
          provide: AuthService,
          useValue: {
            user$: of(mockedUserData),
            logout: () => null,
          },
        },
        {
          provide: NavigationService,
          useValue: {
            getLinks: () => of(mockedLinks),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      NavigationComponent
    );
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should get links from service', (dn: DoneFn) => {
      component.links.subscribe({
        next: (links) => {
          expect(links.length).toEqual(
            mockedLinks.length
          );
          for (let index in links) {
            expect(links[index].href).toBe(
              mockedLinks[index].href
            );
            expect(links[index]?.icon).toBe(
              mockedLinks[index]?.icon
            );
            expect(links[index].label).toBe(
              mockedLinks[index].label
            );
          }
          dn();
        },
      });
    });

    it('Should be obtained user data from service', (dn: DoneFn) => {
      component.user$.subscribe({
        next: (user) => {
          for (let index in Object.keys(user)) {
            expect(
              Object.values(user)[index]
            ).toEqual(
              Object.values(mockedUserData)[index]
            );
          }
          dn();
        },
      });
    });

    it('Should invoke authService logout method', () => {
      const spyOnAuthService = spyOn(
        authService,
        'logout'
      );
      const spyOnRouter = spyOn(
        router,
        'navigate'
      );

      component.onLogout();

      expect(spyOnAuthService).toHaveBeenCalled();
      expect(spyOnAuthService).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render navbar', () => {
      fixture.detectChanges();

      const nav = fixture.debugElement.query(
        By.css('nav')
      ).nativeElement;

      expect(nav).not.toBeNull();
    });

    it('Should emerge user name', () => {
      fixture.detectChanges();

      const userName = fixture.debugElement.query(
        By.css('span.lead')
      ).nativeElement as HTMLSpanElement;

      expect(userName).toBeDefined();
      expect(
        userName.textContent?.trim()
      ).toMatch(mockedUserData.name.trim());
    });

    it('Should render number of links equaled numbers of mockedLinks', () => {
      fixture.detectChanges();

      const links = fixture.debugElement.queryAll(
        By.css('a')
      );

      expect(links.length).toEqual(
        mockedLinks.length
      );
    });

    it('Should render button that invokes logout function after clicking', () => {
      const spyOnLogout = spyOn(
        component,
        'onLogout'
      );
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;

      expect(button).toBeDefined();
      expect(button.textContent?.trim()).toEqual(
        'Logout'
      );

      button.click();

      expect(spyOnLogout).toHaveBeenCalledTimes(
        1
      );
    });
  });
});
