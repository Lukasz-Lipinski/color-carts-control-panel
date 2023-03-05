import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { DashboardHomeComponent } from './dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/components/products-list/product-item/product-item.component';
import { By } from '@angular/platform-browser';
import { mockedProducts } from 'src/app/mocks';
import { ProductService } from 'src/app/components/products-list/product.service';

describe('Testing DashboardHomeComponent', () => {
  let fixture: ComponentFixture<DashboardHomeComponent>;
  let component: DashboardHomeComponent;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardHomeComponent,
        RouterTestingModule,
      ],
      providers: [
        ProductService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              products: mockedProducts,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      DashboardHomeComponent
    );
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should get data from service', (dn: DoneFn) => {
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

    it('Should render Products List Component', () => {
      fixture.detectChanges();
      const productsList =
        fixture.debugElement.query(By.css('ul'));
      expect(productsList).toBeDefined();
    });
  });
});
