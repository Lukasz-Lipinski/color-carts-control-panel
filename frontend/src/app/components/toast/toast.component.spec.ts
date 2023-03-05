import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { BackendRes } from '../auth/auth.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { details } from 'src/app/mocks';

describe('Testing Toast Component', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ToastComponent
    );
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should emerge passed properly props', () => {
      component.details = details;

      for (let index in Object.entries(
        component.details
      )) {
        +index;
        expect(
          Object.entries(component.details)[
            +index
          ][1]
        ).toEqual(
          Object.entries(details!)[+index][1]
        );
      }
    });

    it('Should switch details on null after 2 sec', (dn: DoneFn) => {
      expect(component.details).toBeNull();
      component.details = details;

      expect(component.details).not.toBeNull();
      component.ngOnInit();

      setTimeout(() => {
        expect(component.details).toBeNull();
        dn();
      }, 2001);
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should emerge component if details props is assigned', () => {
      component.details = null;
      component.ngOnInit();
      fixture.detectChanges();

      let toast: DebugElement | null;

      toast = fixture.debugElement.query(
        By.css('div')
      );

      expect(toast).toBeNull();

      component.details = details;
      fixture.detectChanges();
      toast = fixture.debugElement.query(
        By.css('div')
      );

      expect(toast).not.toBeNull;
    });

    it('Should close component if close button was clicked', () => {
      let toast: DebugElement | null;

      component.details = details;
      component.ngOnInit();

      fixture.detectChanges();
      toast =
        fixture.debugElement.query(
          By.css('div')
        ) || null;
      expect(toast).not.toBeNull();

      const btn = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;

      btn.click();

      fixture.detectChanges();

      toast =
        fixture.debugElement.query(
          By.css('div')
        ) || null;

      expect(component.details).toBeNull();
      expect(toast).toBeNull();
    });
  });

  it('Should display directly passed message', () => {
    component.details = details;
    component.ngOnInit();

    fixture.detectChanges();
    const msgContainer =
      fixture.debugElement.query(
        By.css('div.toast-body')
      ).nativeElement as HTMLDivElement;

    expect(msgContainer).toBeDefined();
    expect(
      msgContainer.textContent?.trim()
    ).toEqual(details.msg);
  });
});
