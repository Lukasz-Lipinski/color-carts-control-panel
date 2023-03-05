import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  isDevMode,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  concatMap,
  of,
} from 'rxjs';
import { environment as DevEnv } from 'src/environments/environment';
import { environment as ProdEnv } from 'src/environments/environment.prod';
import { Product } from './product-item/product-item.component';
import { ModalDetails } from '../modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = isDevMode()
    ? `${DevEnv.BACKEND_API}`
    : `${ProdEnv}`;

  productDetails$ = new BehaviorSubject<Product>({
    name: '',
    brand: '',
    ean: 0,
    price: 0,
    amount: 0,
    category: '',
    subcategory: '',
    description: '',
    model: '',
  });
  modalDetails$ =
    new BehaviorSubject<ModalDetails>({
      title: '',
    });

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(
        this.url + '/api/products'
      )
      .pipe(
        concatMap(({ products }) => {
          return of(products);
        })
      );
  }
}
