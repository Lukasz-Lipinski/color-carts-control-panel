import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { mockedModal } from 'src/app/mocks';
import { By } from '@angular/platform-browser';

describe('Testing Modal Component', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let component: ModalComponent;
  let spyOnCloseDialogFunction: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ModalComponent
    );
    component = fixture.componentInstance;

    spyOnCloseDialogFunction = spyOn(
      component,
      'onCloseDialog'
    );
    component.modalDetails = mockedModal;

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should be passed object as props', () => {
      expect(
        component.modalDetails.title
      ).toEqual(mockedModal.title);
    });

    it('Should invoke emitter in case of onCloseDialog usage', () => {
      component.onCloseDialog();
      expect(
        spyOnCloseDialogFunction
      ).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render passed title', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(
        By.css('span')
      ).nativeElement as HTMLSpanElement;
      expect(title.textContent).toEqual(
        mockedModal.title
      );
    });

    it('Should project directly passed content as body', () => {
      fixture.detectChanges();

      const contentProjection =
        fixture.debugElement.query(
          By.css('div.modal-body')
        ).nativeElement as HTMLDivElement;

      expect(
        contentProjection.firstChild
      ).toBeDefined();
    });
  });
});
