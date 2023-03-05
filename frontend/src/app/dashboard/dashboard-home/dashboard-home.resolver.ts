import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { BackendRes } from 'src/app/components/auth/auth.service';
import { CreateProductService } from 'src/app/components/create-product-form/create-product.service';
import { Product } from 'src/app/components/products-list/product-item/product-item.component';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeResolver
  implements Resolve<Product[] | BackendRes>
{
  constructor(
    private createProductService: CreateProductService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[] | BackendRes> {
    return this.createProductService
      .getAllProducts()
      .pipe(
        catchError((err) => {
          return of({
            status: 401,
            msg: 'Connection error',
          } as BackendRes);
        })
      );
  }
}
