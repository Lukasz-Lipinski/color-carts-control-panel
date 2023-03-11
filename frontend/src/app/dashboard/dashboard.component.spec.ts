import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Testing Dashboard Component', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        DashboardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      DashboardComponent
    );
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render navigation component', () => {
      const nav = fixture.debugElement.query(
        By.css('nav')
      ).nativeElement;
      expect(nav).toBeTruthy();
    });

    it('Should render router-outlet', () => {
      const routerOutlet =
        fixture.debugElement.query(
          By.css('router-outlet')
        );

      expect(routerOutlet).toBeTruthy();
    });
  });
});
