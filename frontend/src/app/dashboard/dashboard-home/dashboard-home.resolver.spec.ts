import {
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { DashboardHomeResolver } from './dashboard-home.resolver';
import { ProductService } from 'src/app/components/products-list/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Testing Dashboard Home Resolver', () => {
  let resolver: DashboardHomeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    }).compileComponents();

    resolver = TestBed.inject(
      DashboardHomeResolver
    );
  });

  describe('Class Tests', () => {
    it('Should be rendered', () => {
      expect(resolver).toBeDefined();
    });
  });
});
