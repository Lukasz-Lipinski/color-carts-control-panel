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
  productsNumber: number;
  selectedIndex: number;
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
    productsNumber: 5,
    selectedIndex: 1,
  };

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
          }
          this.productsDetails = {
            ...this.productsDetails,
            productsNumber: Math.ceil(
              products.length /
                this.productsDetails
                  .productsNumber
            ),
          };
          return products as Product[];
        })
      );
  }

  onRemoveProduct() {} // compolete it!

  setToast(res: BackendRes) {
    this.toastService.createComponent(
      this.toast,
      res
    );
  }

  onSearch(parameters: SearcherParameters) {
    this.products$ =
      this.activatedRoute.data.pipe(
        map(({ products }) => {
          if (
            parameters.category.toLowerCase() ===
            'all'
          ) {
            return products.filter(
              (product: Product) =>
                `${product.name}${product.model}${product.brand}`.includes(
                  parameters.product
                )
            );
          }

          if (
            parameters.category.toLowerCase() !==
            'all'
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
        })
      );
  }

  onChangeIndex(index: number) {
    this.productsDetails = {
      ...this.productsDetails,
      selectedIndex: index,
    };
  }
}
