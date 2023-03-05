import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from '../products-list/product-item/product-item.component';
import { CreateProductService } from '../create-product-form/create-product.service';
import { Observable } from 'rxjs';
import { BackendRes } from '../auth/auth.service';

@Component({
  selector: 'app-updated-form-modal',
  templateUrl:
    './updated-form-modal.component.html',
  styleUrls: [
    './updated-form-modal.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatedFormModalComponent
  implements OnInit
{
  modalDetails: { title: string } = {
    title: 'Updating product',
  };
  selectedProduct$!: Observable<Product>;
  @Output() toastEmitter =
    new EventEmitter<BackendRes>();

  constructor(
    private createProductService: CreateProductService
  ) {}

  ngOnInit(): void {
    this.selectedProduct$ =
      this.createProductService.productDetails$;
  }

  onCloseModal() {
    this.createProductService.modal$.next('');
  }

  onToastEmitter(res: BackendRes) {
    this.toastEmitter.emit(res);
    this.createProductService.modal$.next('');
  }
}
