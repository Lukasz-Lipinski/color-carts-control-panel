import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { ToastService } from '../components/toast/toast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockedProduct } from '../mocks';
import { CreateProductService } from '../components/create-product-form/create-product.service';
import { By } from '@angular/platform-browser';

describe('Testing Create Product Component', () => {
  let fixture: ComponentFixture<CreateProductComponent>;
  let component: CreateProductComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CreateProductComponent,
        HttpClientTestingModule,
      ],
      providers: [
        CreateProductService,
        ToastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      CreateProductComponent
    );
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  describe('Class Tests', () => {
    it('Should create toast', () => {
      component.onDispatchProductToBackend(
        mockedProduct
      );

      fixture.detectChanges();
      expect(component.toast).toBeDefined();
    });
  });

  describe('DOM Tests', () => {
    it('Should be rendered', () => {
      expect(component).toBeDefined();
    });

    it('Should display create product form', () => {
      const form = fixture.debugElement.query(
        By.css('app-create-product-form')
      ).nativeElement;

      expect(form).toBeDefined();
    });
  });
});
