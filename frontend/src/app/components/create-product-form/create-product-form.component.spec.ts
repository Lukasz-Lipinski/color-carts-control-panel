import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { CreateProductFormComponent } from './create-product-form.component';
import {
  Category,
  CreateProductService,
  Field,
} from './create-product.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  mockedCategories as categories,
  mockedFields as fields,
} from 'src/app/mocks';

describe('Testing Create Product Form Component', () => {
  let fixture: ComponentFixture<CreateProductFormComponent>;
  let component: CreateProductFormComponent;

  const mockedFields: Field[] = fields;
  const mockedCategories: Category[] = categories;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductFormComponent],
      providers: [
        {
          provide: CreateProductService,
          useValue: {
            getFields: () => mockedFields,
            getCategories: () => mockedCategories,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      CreateProductFormComponent
    );
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should get categories form service', () => {
      expect(component.categories.length).toEqual(
        mockedCategories.length
      );

      for (let catIndex in component.categories) {
        expect(
          component.categories[catIndex]
            .mainCategory
        ).toBe(
          mockedCategories[catIndex].mainCategory
        );
        for (let subcatIndex in component
          .categories[catIndex].subcategories) {
          expect(
            component.categories[catIndex]
              .subcategories[subcatIndex]
          ).toEqual(
            mockedCategories[catIndex]
              .subcategories[subcatIndex]
          );
        }
      }
    });

    it('Should get fields form service', () => {
      for (let fieldIndex in component.fields) {
        expect(
          component.fields[fieldIndex]
        ).toEqual(mockedFields[fieldIndex]);
      }
    });

    it('Should establish subcategory array accroding to incoming categories at the start', () => {
      expect(component.subcategories[0]).toEqual(
        mockedCategories[0].subcategories[0]
      );
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render all inputs basing on fields prop', () => {
      fixture.detectChanges();

      const inputs =
        fixture.debugElement.queryAll(
          By.css('input')
        );

      expect(inputs.length).toEqual(
        mockedFields.length
      );
    });

    it('Should render category with subcategories', () => {
      fixture.detectChanges();

      const catAndSubcat =
        fixture.debugElement.queryAll(
          By.css('select')
        );
      expect(catAndSubcat.length).toEqual(2);
    });

    it('Should render textarea', () => {
      fixture.detectChanges();

      const textarea = fixture.debugElement.query(
        By.css('textarea')
      );
      expect(textarea).toBeDefined();
    });

    it('Should render submit button and should be disabled defaulty', () => {
      fixture.detectChanges();

      const btn = fixture.debugElement.query(
        By.css('button')
      ).nativeElement as HTMLButtonElement;

      expect(btn).toBeDefined();
      expect(btn.disabled).toBeTrue();
    });
  });
});
