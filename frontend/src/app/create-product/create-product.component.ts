import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Product } from '../components/products-list/product-item/product-item.component';
import { ToastDirective } from '../components/toast/toast.directive';
import { CreateProductService } from '../components/create-product-form/create-product.service';
import { ToastService } from '../components/toast/toast.service';
import { concatMap, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class CreateProductComponent
  implements OnInit
{
  @ViewChild(ToastDirective, { static: true })
  toast!: ToastDirective;

  constructor(
    private createProductService: CreateProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  onDispatchProductToBackend(product: Product) {
    this.createProductService
      .dispatchProductToBackend(product)
      .pipe(
        concatMap((res) => {
          this.toastService.createComponent(
            this.toast,
            res
          );
          return of(res);
        })
      )
      .subscribe();
  }
}
