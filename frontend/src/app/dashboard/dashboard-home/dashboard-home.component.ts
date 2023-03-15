import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BackendRes } from 'src/app/components/auth/auth.service';
import {
  CreateProductService,
  ModalType,
} from 'src/app/components/create-product-form/create-product.service';
import { Product } from 'src/app/components/products-list/product-item/product-item.component';
import { SearcherParameters } from 'src/app/components/searcher/searcher.component';
import { ToastDirective } from 'src/app/components/toast/toast.directive';
import { ToastService } from 'src/app/components/toast/toast.service';
import { SharedModule } from 'src/app/shared/shared.module';

interface ProductsDetails {
  indexes: number;
  selectedIndex: number;
  readonly howManyDisplay: number;
}

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class DashboardHomeComponent
  implements OnInit
{
  @ViewChild(ToastDirective, { static: true })
  toast!: ToastDirective;
  error?: { status: number; msg: string } =
    undefined;
  products$!: Observable<Product[] | null>;
  selectedProduct$!: Observable<Product>;
  modal$!: Observable<ModalType>;
  productsDetails: ProductsDetails = {
    indexes: 1,
    selectedIndex: 1,
    howManyDisplay: 8,
  };
  private searcher?: SearcherParameters;

  constructor(
    private activatedRoute: ActivatedRoute,
    private createProductService: CreateProductService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.selectedProduct$ =
      this.createProductService.productDetails$;
    this.modal$ =
      this.createProductService.modal$;

    this.products$ =
      this.activatedRoute.data.pipe(
        map(({ products }) => {
          if ('status' in products) {
            this.error = {
              ...products,
            };
            return null;
          } else {
            this.setProductDetails(products);
            this.error = undefined;
          }
          return this.setSelectedProducts(
            products as Product[]
          );
        })
      );
  }

  setToast(res: BackendRes) {
    this.toastService.createComponent(
      this.toast,
      res
    );
  }

  onSearch(parameters: SearcherParameters) {
    this.searcher = parameters;
    this.products$ =
      this.activatedRoute.data.pipe(
        map(({ products }) => {
          return this.filterProducts(
            parameters,
            products
          );
        }),
        map((products) => {
          this.productsDetails = {
            ...this.productsDetails,
            selectedIndex: 1,
          };
          return (
            products &&
            this.setSelectedProducts(
              products as Product[]
            )
          );
        })
      );
  }

  onChangeIndex(index: number) {
    this.productsDetails = {
      ...this.productsDetails,
      selectedIndex: index,
    };

    this.products$ =
      this.activatedRoute.data.pipe(
        map(({ products }) => {
          return this.searcher
            ? this.filterProducts(
                this.searcher,
                products
              )
            : products;
        }),
        map((products) => {
          return this.setSelectedProducts(
            products
          );
        })
      );
  }

  private setSelectedProducts(
    products: Product[]
  ): Product[] {
    this.setProductDetails(products);

    const lastIndex =
      this.productsDetails.selectedIndex === 1
        ? this.productsDetails.howManyDisplay
        : this.productsDetails.howManyDisplay *
            this.productsDetails.selectedIndex +
          1;

    const firstIndex =
      this.productsDetails.selectedIndex === 1
        ? 0
        : this.productsDetails.howManyDisplay *
            this.productsDetails.selectedIndex -
          this.productsDetails.howManyDisplay;

    return (products as Product[]).slice(
      firstIndex,
      lastIndex
    );
  }

  private filterProducts(
    parameters: SearcherParameters,
    products: Product[]
  ): Product[] {
    if (
      parameters.category.toLowerCase() === 'all'
    ) {
      return products.filter((product: Product) =>
        `${product.name}${product.model}${product.brand}`.includes(
          parameters.product
        )
      );
    }

    if (
      parameters.category.toLowerCase() !== 'all'
    ) {
      return (
        products.filter(
          (product: Product) =>
            product.category.toLowerCase() ===
            parameters.category
        ) || null
      );
    }

    return (
      products.filter(
        (product: Product) =>
          `${product.name}${product.model}${product.brand}`.includes(
            parameters.product
          ) &&
          product.category.toLowerCase() ===
            parameters.category
      ) || null
    );
  }

  private setProductDetails(products: Product[]) {
    this.productsDetails = {
      ...this.productsDetails,
      indexes:
        products.length %
        this.productsDetails.howManyDisplay
          ? Math.ceil(
              products.length /
                this.productsDetails
                  .howManyDisplay
            )
          : products.length /
            this.productsDetails.howManyDisplay,
    };
  }
}
