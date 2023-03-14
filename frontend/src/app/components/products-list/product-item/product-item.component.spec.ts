import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  Product,
  ProductItemComponent,
} from './product-item.component';
import { mockedProduct } from 'src/app/mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CreateProductService } from '../../create-product-form/create-product.service';
import { ModalComponent } from '../../modal/modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Testing ProductItem Component', () => {
  let fixture: ComponentFixture<ProductItemComponent>;
  let component: ProductItemComponent;
  let productService: CreateProductService;

  let spyOnProductDetails$: any;
  let spyOnModalDetails$: any;

  const event = new Event('');

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductItemComponent,
        ModalComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [CreateProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ProductItemComponent
    );
    component = fixture.componentInstance;
    productService = TestBed.inject(
      CreateProductService
    );

    spyOnProductDetails$ = spyOn(
      productService.productDetails$,
      'next'
    );
    spyOnModalDetails$ = spyOn(
      productService.modal$,
      'next'
    );
    component.product = mockedProduct;
    component.ngOnInit();
    fixture.detectChanges();
  });

  describe('Class Tests', () => {
    it('Should be assigned exactly one product in prop', () => {
      expect(component.product).toBeDefined();

      for (let index in Object.values(
        component.product
      )) {
        expect(
          Object.values(component.product)[index]
        ).toEqual(
          Object.values(mockedProduct)[index]
        );
      }
    });

    it('Should send product via service if onTransferProductToModal was invoked', () => {
      component.product = mockedProduct;
      component.onUpdate(event);

      expect(
        spyOnProductDetails$
      ).toHaveBeenCalled();
      expect(
        spyOnModalDetails$
      ).toHaveBeenCalled();
    });

    it('Should invoke modalDetails$ observable if onDeleteProduct was invoked', () => {
      component.onDeleteProduct(event);

      expect(
        spyOnModalDetails$
      ).toHaveBeenCalled();
    });

    it('Should switch modal component if onToggleModal was invoked', () => {
      expect(
        component.showModalDetails
      ).toBeFalse();
      component.onToggleModal();
      expect(
        component.showModalDetails
      ).toBeTrue();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should invoke apropriate function depending on clicked button', () => {
      const spyOnOnTransferProductToModal = spyOn(
        component,
        'onUpdate'
      );
      const spyOnOnDeleteProduct = spyOn(
        component,
        'onDeleteProduct'
      );

      const divs = fixture.debugElement
        .query(By.css('li'))
        .queryAll(By.css('div'));

      const buttons = (
        divs[divs.length - 1]
          .nativeElement as HTMLDivElement
      ).querySelectorAll('button');

      //Testing Update button
      expect(
        buttons[0].textContent?.trim()
      ).toEqual('Update');
      buttons[0].click();
      expect(
        spyOnOnTransferProductToModal
      ).toHaveBeenCalledTimes(1);

      //Testing Delete button
      expect(
        buttons[1].textContent?.trim()
      ).toEqual('Delete');
      buttons[1].click();
      expect(
        spyOnOnDeleteProduct
      ).toHaveBeenCalledTimes(1);
    });

    it('Should display modal while list element was clicked', () => {
      const li = fixture.debugElement.query(
        By.css('li')
      ).nativeElement as HTMLLIElement;

      let modal: HTMLDivElement | undefined =
        fixture.debugElement.query(
          By.css('div.modal')
        )?.nativeElement as HTMLDivElement;

      expect(modal).toBeUndefined();

      li.click();
      fixture.detectChanges();
      modal = fixture.debugElement.query(
        By.css('div.modal')
      ).nativeElement as HTMLDivElement;

      expect(modal).toBeDefined();
    });
  });
});
