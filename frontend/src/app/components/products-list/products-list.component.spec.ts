import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockedProducts } from 'src/app/mocks';

describe('Testing Product List Component', () => {
  let fixture: ComponentFixture<ProductsListComponent>;
  let component: ProductsListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ProductsListComponent
    );
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should obtain stream as props', (dn: DoneFn) => {
      component.products$ = of(mockedProducts);
      fixture.detectChanges();

      component.products$.subscribe({
        next: (products) => {
          expect(products!.length).toEqual(
            mockedProducts.length
          );
          dn();
        },
      });
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });
  });
});
