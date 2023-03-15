import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product-item/product-item.component';

@Component({
  selector: 'app-products-list[pageIndex]',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent
  implements OnInit
{
  @Input() products$!: Observable<
    Product[] | null
  >;
  @Input() pageIndex!: number;
  constructor() {}

  ngOnInit(): void {}
}
