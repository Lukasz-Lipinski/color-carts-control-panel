import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { ModalComponent } from '../modal/modal.component';
import { By } from '@angular/platform-browser';

describe('Testing Pagination Component', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;

  let spyOnIndexEmitter: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      PaginationComponent
    );
    component = fixture.componentInstance;
    component.selectedIndex = 3;
    component.indexes = 10;
    spyOnIndexEmitter = spyOn(
      component.indexEmitter,
      'emit'
    );

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should return labels', () => {
      for (let index of component.getLabels()) {
        expect(index).toBeLessThanOrEqual(
          component.indexes
        );
      }
    });

    it('Should change page while onChangePage with apropriate parameter was invoked and emit value', () => {
      component.onChangePage('next');
      expect(component.selectedIndex).toEqual(4);

      component.onChangePage('previous');
      expect(component.selectedIndex).toEqual(3);

      expect(
        spyOnIndexEmitter
      ).toHaveBeenCalledTimes(2);
    });

    it('Should emit value while onSetExactIndex function was invoked', () => {
      component.onSetExactIndex(2);

      expect(
        spyOnIndexEmitter
      ).toHaveBeenCalledWith(2);
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render previous and emit value', () => {
      const previousLink: HTMLLinkElement =
        fixture.debugElement
          .queryAll(By.css('li'))
          .find(
            (element) =>
              (
                element.nativeElement as HTMLLIElement
              )
                .querySelector('a.page-link')
                ?.textContent?.toLowerCase() ===
              'previous'
          )?.nativeElement as HTMLLinkElement;

      expect(previousLink).toBeDefined();

      previousLink.click();
      fixture.detectChanges();

      expect(
        spyOnIndexEmitter
      ).toHaveBeenCalled();
    });

    it('Should render next link and emit value while link was invoked', () => {
      const nextLink: HTMLLinkElement =
        fixture.debugElement
          .queryAll(By.css('li'))
          .find(
            (element) =>
              (
                element.nativeElement as HTMLLIElement
              )
                .querySelector('a.page-link')
                ?.textContent?.toLowerCase() ===
              'next'
          )?.nativeElement as HTMLLinkElement;

      expect(nextLink).toBeDefined();

      nextLink.click();
      fixture.detectChanges();

      expect(
        spyOnIndexEmitter
      ).toHaveBeenCalled();
    });
  });
});
