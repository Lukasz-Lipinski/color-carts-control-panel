import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { UpdatedFormModalComponent } from './updated-form-modal.component';
import { CreateProductService } from '../create-product-form/create-product.service';
import { mockedProduct } from 'src/app/mocks';
import { BehaviorSubject, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from '../products-list/product-item/product-item.component';
import { By } from '@angular/platform-browser';

describe('Testing UpdatedFormModal Component', () => {
  let fixture: ComponentFixture<UpdatedFormModalComponent>;
  let component: UpdatedFormModalComponent;
  let service: CreateProductService;
  let spyOnEmitter: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatedFormModalComponent],
      providers: [
        {
          provide: CreateProductService,
          useValue: {
            productDetails$: of(mockedProduct),
            modal$: new BehaviorSubject<Product>(
              mockedProduct
            ),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      UpdatedFormModalComponent
    );
    component = fixture.componentInstance;

    service = TestBed.inject(
      CreateProductService
    );

    component.ngOnInit();
    spyOnEmitter = spyOn(service.modal$, 'next');
  });

  describe('Class Tests', () => {
    it('Should get data from service', (dn: DoneFn) => {
      component.selectedProduct$.subscribe({
        next: (product) => {
          for (let val of Object.values(
            product
          )) {
            expect(
              Object.values(
                mockedProduct
              ).includes(val)
            ).toBeTrue();
          }
          dn();
        },
      });
    });

    it('Should invoke emitter from service', () => {
      component.onCloseModal();

      expect(spyOnEmitter).toHaveBeenCalledTimes(
        1
      );
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should render updated from component', () => {
      fixture.detectChanges();

      const updatedFormElement =
        fixture.debugElement.query(
          By.css('app-update-product-form')
        );

      expect(updatedFormElement).toBeDefined();
    });
  });
});
