import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RemoveModalComponent } from './remove-modal.component';
import {
  BehaviorSubject,
  Observable,
  Observer,
  Operator,
  Subscription,
  of,
} from 'rxjs';
import {
  mockedProduct,
  mockedRes,
} from 'src/app/mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Product } from '../products-list/product-item/product-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  CreateProductService,
  ModalType,
} from '../create-product-form/create-product.service';
import { By } from '@angular/platform-browser';

describe('Testing Remove Modal Component', () => {
  let fixture: ComponentFixture<RemoveModalComponent>;
  let component: RemoveModalComponent;
  let service: CreateProductService;

  let spyOnModal$: jasmine.Spy;
  let spyOnDeleteProduct: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveModalComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CreateProductService,
          useValue: {
            productDetails$:
              new BehaviorSubject<Product>(
                mockedProduct
              ),
            modal$:
              new BehaviorSubject<ModalType>(
                'update'
              ),
            deleteProduct: function () {
              return of(mockedRes);
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(
      RemoveModalComponent
    );
    service = TestBed.inject(
      CreateProductService
    );

    component = fixture.componentInstance;
    spyOnModal$ = spyOn(service.modal$, 'next');
    spyOnDeleteProduct = spyOn(
      service,
      'deleteProduct'
    ).and.returnValue(of(mockedRes));

    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should get data from service', () => {
      expect(
        component.selectedProduct
      ).toBeDefined();

      for (let value of Object.values(
        component.selectedProduct
      )) {
        expect(
          Object.values(mockedProduct).includes(
            value
          )
        ).toBeTrue();
      }
    });

    it('Should emit value after invoking onCloseModal', (dn: DoneFn) => {
      component.onCloseModal();
      dn();
      expect(spyOnModal$).toHaveBeenCalledTimes(
        1
      );
    });

    it('Should invoke service function after directly invoking onRemoveProduct', (dn: DoneFn) => {
      component.onRemoveProduct();
      dn();
      expect(spyOnModal$).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should invoke onCloseModal function if button was clicked', (dn: DoneFn) => {
      fixture.detectChanges();
      const btn = fixture.debugElement.query(
        By.css('button.btn.btn-primary')
      ).nativeElement as HTMLButtonElement;
      btn.click();
      dn();

      expect(spyOnModal$).toHaveBeenCalled();
    });

    it('Should invoke OnRemoveProduct and service functions', (dn: DoneFn) => {
      fixture.detectChanges();
      const btn = fixture.debugElement.query(
        By.css('button.btn.btn-danger')
      ).nativeElement as HTMLButtonElement;
      btn.click();
      dn();

      expect(spyOnModal$).toHaveBeenCalled();
      expect(
        spyOnDeleteProduct
      ).toHaveBeenCalled();
    });
  });
});
