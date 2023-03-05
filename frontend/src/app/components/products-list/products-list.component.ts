import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product-item/product-item.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent
  implements OnInit
{
  @Input() products$!: Observable<
    Product[] | null
  >;
  constructor() {}

  ngOnInit(): void {}
}
