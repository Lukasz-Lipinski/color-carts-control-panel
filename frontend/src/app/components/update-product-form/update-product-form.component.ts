import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from '../products-list/product-item/product-item.component';
import { CreateProductService } from '../create-product-form/create-product.service';
import { Category } from '../create-product-form/create-product.service';
import { Field } from '../create-product-form/create-product.service';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CreateProductFormProps } from '../create-product-form/create-product-form.component';
import { concatMap, of } from 'rxjs';
import { BackendRes } from '../auth/auth.service';

@Component({
  selector: 'app-update-product-form',
  templateUrl:
    './update-product-form.component.html',
  styleUrls: [
    './update-product-form.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProductFormComponent
  implements OnInit
{
  @Output() toastEmitter =
    new EventEmitter<BackendRes>();
  @Input() selectedProduct!: Product;
  updateForm!: FormGroup<CreateProductFormProps>;
  fields!: Field[];
  categories!: Category[];
  subcategories!: string[];
  spinner = {
    isShown: false,
  };

  constructor(
    private createProductService: CreateProductService
  ) {}

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      amount: new FormControl(
        this.selectedProduct.amount,
        {
          nonNullable: true,
        }
      ),
      brand: new FormControl(
        this.selectedProduct.brand,
        {
          nonNullable: true,
        }
      ),
      description: new FormControl(
        this.selectedProduct.description,
        {
          nonNullable: true,
        }
      ),
      ean: new FormControl(
        this.selectedProduct.ean,
        {
          nonNullable: true,
        }
      ),
      model: new FormControl(
        this.selectedProduct.model,
        {
          nonNullable: true,
        }
      ),
      name: new FormControl(
        this.selectedProduct.name,
        {
          nonNullable: true,
        }
      ),
      price: new FormControl(
        this.selectedProduct.price,
        {
          nonNullable: true,
        }
      ),
      category: new FormControl(
        this.selectedProduct.category,
        {
          nonNullable: true,
        }
      ),
      subcategory: new FormControl(
        this.selectedProduct.subcategory,
        {
          nonNullable: true,
        }
      ),
    });
    this.updateForm.controls['ean'].disable();

    this.fields =
      this.createProductService.getFields();
    this.categories =
      this.createProductService.getCategories();
    this.setSubcategoriesAtStart();
  }

  setSubcategoriesAtStart() {
    this.subcategories =
      this.categories.find(
        (category) =>
          category.mainCategory ===
          this.updateForm.controls['category']
            .value
      )?.subcategories || [];
  }

  onSetSubcategories() {
    this.setSubcategoriesAtStart();
    this.updateForm.controls[
      'subcategory'
    ].setValue(this.subcategories[0]);
  }

  onUpdate() {
    this.spinner = {
      isShown: true,
    };

    const newProduct: Product = {
      id: '',
      name: '',
      brand: '',
      ean: this.selectedProduct.ean,
      price: 0,
      amount: 0,
      category: '',
      subcategory: '',
      description: '',
      model: '',
    };

    for (let control in this.updateForm
      .controls) {
      if (control !== 'ean') {
        Object.defineProperty(
          newProduct,
          control,
          {
            value:
              this.updateForm.controls[control]
                .value,
          }
        );
      }
    }
    newProduct.id = this.selectedProduct.id;

    this.createProductService
      .updateProduct(newProduct)
      .pipe(
        concatMap((res) => {
          this.spinner = {
            isShown: false,
          };

          return of(res);
        })
      )
      .subscribe({
        next: (res) => {
          this.toastEmitter.emit(res);
        },
      });
  }
}
