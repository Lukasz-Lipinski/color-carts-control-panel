import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { CreateProductService } from '../create-product-form/create-product.service';
import { Product } from '../products-list/product-item/product-item.component';
import { concatMap, of } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { BackendRes } from '../auth/auth.service';

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveModalComponent
  implements OnInit
{
  modalDetails = {
    title: 'Removing product',
  };
  selectedProduct!: Product;
  @Output() toastEmitter =
    new EventEmitter<BackendRes>();

  constructor(
    private createProductService: CreateProductService
  ) {}

  ngOnInit(): void {
    this.createProductService.productDetails$.subscribe(
      {
        next: (product) => {
          this.selectedProduct = product;
        },
      }
    );
  }

  onCloseModal() {
    this.createProductService.modal$.next('');
  }

  onRemoveProduct() {
    const { ean, id } = this.selectedProduct;
    this.createProductService
      .deleteProduct({
        id: id!,
        ean,
      })
      .pipe(
        concatMap((res) => {
          if (
            res.status < 300 &&
            res.status >= 200
          ) {
            this.createProductService.modal$.next(
              ''
            );
          }

          return of(res);
        })
      )
      .subscribe({
        next: (res) =>
          this.toastEmitter.emit(res),
      });
  }
}
