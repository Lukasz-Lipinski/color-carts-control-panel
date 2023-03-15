import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('Testing App Component', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        AppRoutingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture =
      TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });
  });
});
