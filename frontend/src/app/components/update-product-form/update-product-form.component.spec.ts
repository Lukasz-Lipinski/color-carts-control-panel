import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { UpdateProductFormComponent } from './update-product-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateProductService } from '../create-product-form/create-product.service';
import {
  mockedCategories,
  mockedFields,
  mockedProduct,
} from 'src/app/mocks';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Testing UpdateProductFormComponent', () => {
  let fixture: ComponentFixture<UpdateProductFormComponent>;
  let component: UpdateProductFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductFormComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CreateProductService,
          useValue: {
            getCategories: () => mockedCategories,
            getFields: () => mockedFields,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      UpdateProductFormComponent
    );
    component = fixture.componentInstance;
    component.selectedProduct = mockedProduct;

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should get data from service', () => {
      expect(component.categories.length).toEqual(
        mockedCategories.length
      );

      for (let index in component.categories) {
        expect(
          component.categories[index].mainCategory
        ).toEqual(
          mockedCategories[index].mainCategory
        );

        for (let innerIndex in component
          .categories[index].subcategories) {
          expect(
            component.categories[index]
              .subcategories[innerIndex]
          ).toEqual(
            mockedCategories[index].subcategories[
              innerIndex
            ]
          );
        }
      }
    });

    it('Should initiate updateForm object during onOnInit', () => {
      expect(component.updateForm).toBeDefined();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render fields taken from mocked object', () => {
      fixture.detectChanges();

      const allFields = fixture.debugElement
        .queryAll(By.css('div.input-group'))
        .filter((div) => {
          const input = (
            div.nativeElement as HTMLDivElement
          ).querySelector('input.form-control');
          return input && div;
        });

      expect(allFields.length).toEqual(
        mockedFields.length
      );

      for (let index in allFields) {
        expect(
          (
            allFields[index].query(By.css('span'))
              .nativeElement as HTMLSpanElement
          ).textContent
            ?.toLowerCase()
            ?.trim()
        ).toEqual(mockedFields[index].label);
      }
    });
  });
});
