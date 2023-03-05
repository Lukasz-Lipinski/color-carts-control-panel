import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CreateProductService } from '../../create-product-form/create-product.service';

export interface Product {
  id?: string;
  name: string;
  brand: string;
  ean: number;
  price: number;
  amount: number;
  category: string;
  subcategory: string;
  description: string;
  model: string;
}

@Component({
  selector: 'app-product-item[product]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent
  implements OnInit
{
  @Input() product!: Product;

  constructor(
    private createProductService: CreateProductService
  ) {}

  ngOnInit() {}

  onUpdate() {
    this.createProductService.modal$.next(
      'update'
    );
    this.createProductService.productDetails$.next(
      this.product
    );
  }

  onDeleteProduct() {
    this.createProductService.modal$.next(
      'remove'
    );
    this.createProductService.productDetails$.next(
      this.product
    );
  }
}
