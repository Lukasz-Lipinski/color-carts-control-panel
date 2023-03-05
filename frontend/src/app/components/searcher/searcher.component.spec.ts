import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { SearcherComponent } from './searcher.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateProductService } from '../create-product-form/create-product.service';
import { mockedCategories } from 'src/app/mocks';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Testing Searcher Component', () => {
  let fixture: ComponentFixture<SearcherComponent>;
  let component: SearcherComponent;
  let spyOnEmitter: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearcherComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CreateProductService,
          useValue: {
            getCategories: () => mockedCategories,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SearcherComponent
    );
    component = fixture.componentInstance;

    component.ngOnInit();

    spyOnEmitter = spyOn(
      component.searcherEmitter,
      'emit'
    );
  });

  describe('Class Tests', () => {
    it('Should get categories form service', () => {
      expect(component.categories.length).toEqual(
        mockedCategories.length
      );
      for (let index in component.categories) {
        expect(
          component.categories[index].mainCategory
        ).toEqual(
          mockedCategories[index].mainCategory
        );
        expect(
          component.categories[index]
            .subcategories.length
        ).toEqual(
          mockedCategories[index].subcategories
            .length
        );
      }
    });

    it('Should create an instance of searchForm during ngOnInit', () => {
      expect(
        component.searcherForm
      ).toBeDefined();
    });

    it('Should emit value depending on type of event', () => {
      const searcherInput =
        component.searcherForm.controls[
          'searcher'
        ];
      searcherInput.setValue('test');

      const enterEvent = new KeyboardEvent(
        'submit',
        {
          code: 'Enter',
        }
      );

      const otherKeyEvent = new KeyboardEvent(
        'submit',
        {
          code: 'a',
        }
      );

      const submitEvent = new SubmitEvent(
        'submit'
      );

      component.onSearch(otherKeyEvent);
      expect(spyOnEmitter).not.toHaveBeenCalled();
      component.onSearch(enterEvent);
      expect(spyOnEmitter).toHaveBeenCalled();
      component.onSearch(submitEvent);
      expect(spyOnEmitter).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render typed search input', () => {
      fixture.detectChanges();

      const searchInput =
        fixture.debugElement.query(
          By.css('input[type="search"]')
        ).nativeElement as HTMLInputElement;
      expect(searchInput).toBeDefined();
      expect(searchInput.placeholder).toEqual(
        'Find product'
      );
    });

    it('Should render select input with defaulty chose ALL option', () => {
      fixture.detectChanges();

      const select = fixture.debugElement.query(
        By.css('select')
      ).nativeElement as HTMLSelectElement;
      expect(select.selectedIndex).toEqual(0);
      expect(
        select.firstChild?.textContent?.trim()
      ).toEqual('ALL');
    });

    it('Should render button with magnifying glass icon inside', () => {
      fixture.detectChanges();

      const btn = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;

      expect(btn).toBeDefined();
      expect(btn.type).toEqual('submit');
      expect(
        btn.querySelector('span.bi')
      ).toBeDefined();
    });
  });
});
