import {
  Injectable,
  isDevMode,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  concatMap,
  of,
} from 'rxjs';
import { environment as DevEnv } from 'src/environments/environment';
import { environment as ProdEnv } from 'src/environments/environment.prod';
import { BackendRes } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products-list/product-item/product-item.component';
import { mockedRes } from 'src/app/mocks';

export interface Field {
  name: string;
  label: string;
  type: string;
}

export interface Category {
  mainCategory: string;
  subcategories: string[];
}

export type ModalType = 'update' | 'remove' | '';

@Injectable({
  providedIn: 'root',
})
export class CreateProductService {
  url = isDevMode()
    ? DevEnv.BACKEND_API
    : ProdEnv;

  private inputs: Field[] = [
    {
      name: 'name',
      label: 'product name',
      type: 'text',
    },
    {
      name: 'brand',
      label: 'brand',
      type: 'text',
    },
    {
      name: 'model',
      label: 'model',
      type: 'text',
    },
    {
      name: 'ean',
      label: 'ean',
      type: 'number',
    },
    {
      name: 'price',
      label: 'price',
      type: 'string',
    },
    {
      name: 'amount',
      label: 'amount',
      type: 'number',
    },
  ];

  private categories: Category[] = [
    {
      mainCategory: 'garden',
      subcategories: [
        'ladders',
        'gardening tools',
        'saws and chainsaws',
      ],
    },
    {
      mainCategory: 'home',
      subcategories: [
        'furniture',
        'lamps',
        'heating',
      ],
    },
    {
      mainCategory: 'accessories for food',
      subcategories: [
        'lunch boxes',
        'bags for food',
        'bags for frozen food',
      ],
    },
  ];

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
  modal$ = new BehaviorSubject<ModalType>('');

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

  getCategories() {
    return this.categories;
  }

  getFields() {
    return this.inputs;
  }

  dispatchProductToBackend(
    newProduct: Product
  ): Observable<BackendRes> {
    return this.http
      .post<BackendRes>(
        this.url + '/api/products/add',
        newProduct
      )
      .pipe(
        catchError((err) => {
          return of({
            status: 401,
            msg: 'Server does not respond',
          } as BackendRes);
        })
      );
  }

  updateProduct(
    updatedProduct: Product
  ): Observable<BackendRes> {
    return this.http.patch<BackendRes>(
      this.url + '/api/products/update',
      updatedProduct
    );
  }

  deleteProduct({
    id,
    ean,
  }: {
    id: string;
    ean: number;
  }): Observable<BackendRes> {
    return this.http.delete<BackendRes>(
      this.url + '/api/products/remove',
      {
        body: {
          id,
          ean,
        },
      }
    );
  }
}
