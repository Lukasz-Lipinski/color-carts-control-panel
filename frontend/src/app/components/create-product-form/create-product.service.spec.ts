import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { CreateProductService } from './create-product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  mockedProduct,
  mockedRes,
} from 'src/app/mocks';

describe('Testing Create Product Service', () => {
  let service: CreateProductService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(
      CreateProductService
    );
    controller = TestBed.inject(
      HttpTestingController
    );
  });

  describe('Class Tests', () => {
    it('Should be created', () => {
      expect(service).toBeDefined();
    });

    it('Should return categories for component', () => {
      expect(
        service.getCategories().length
      ).toBeGreaterThan(0);
    });
  });

  it('Should return fields for component', () => {
    expect(
      service.getFields().length
    ).toBeGreaterThan(0);
  });

  it('Should send data to backend', (dn: DoneFn) => {
    service
      .dispatchProductToBackend(mockedProduct)
      .subscribe({
        next: (res) => {
          expect(res.msg).toBe(mockedRes.msg);
          expect(res.status).toEqual(
            mockedRes.status
          );
          dn();
        },
      });

    controller
      .expectOne(
        service.url + '/api/products/add'
      )
      .flush(mockedRes);
  });
});
