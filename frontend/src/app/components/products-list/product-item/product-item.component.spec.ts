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

describe('Testing ProductItem Component', () => {
  let fixture: ComponentFixture<ProductItemComponent>;
  let component: ProductItemComponent;
  let productService: CreateProductService;

  let spyOnProductDetails$: any;
  let spyOnModalDetails$: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
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
      component.onUpdate();

      expect(
        spyOnProductDetails$
      ).toHaveBeenCalled();
      expect(
        spyOnModalDetails$
      ).toHaveBeenCalled();
    });

    it('Should invoke modalDetails$ observable if onDeleteProduct was invoked', () => {
      component.onDeleteProduct();

      expect(
        spyOnModalDetails$
      ).toHaveBeenCalled();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should display product details', () => {
      const span = fixture.debugElement.query(
        By.css('span.h4')
      ).nativeElement as HTMLSpanElement;

      expect(
        span.textContent?.trim().toLowerCase()
      ).toEqual(
        `${mockedProduct.brand} ${mockedProduct.model} (${mockedProduct.name})`
      );
    });

    it('Should return category taken from mockedProduct', () => {
      const descriptionDivs = (
        fixture.debugElement.query(
          By.css('div.col')
        ).nativeElement as HTMLDivElement
      ).querySelectorAll('div.row');

      expect(
        descriptionDivs[0].textContent?.trim()
      ).toEqual(
        `Category: ${mockedProduct.category}`
      );
      expect(
        descriptionDivs[1].textContent?.trim()
      ).toEqual(
        `Subcategory: ${mockedProduct.subcategory}`
      );
    });

    it('Should display description taken from product', () => {
      const descriptionDiv =
        fixture.debugElement.queryAll(
          By.css('div.col')
        )[
          fixture.debugElement.queryAll(
            By.css('div.col')
          ).length - 1
        ].nativeElement as HTMLDivElement;

      expect(
        descriptionDiv
          .querySelectorAll('span')[0]
          .textContent?.trim()
      ).toEqual('Description:');
      expect(
        descriptionDiv
          .querySelectorAll('span')[1]
          .textContent?.trim()
      ).toEqual(mockedProduct.description);
    });
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
});
