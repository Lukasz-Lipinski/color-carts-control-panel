import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Category,
  CreateProductService,
  Field,
} from './create-product.service';
import { Product } from '../products-list/product-item/product-item.component';

export interface CreateProductFormProps {
  name: FormControl<string>;
  model: FormControl<string>;
  brand: FormControl<string>;
  ean: FormControl<number>;
  price: FormControl<number>;
  amount: FormControl<number>;
  category: FormControl<string>;
  subcategory: FormControl<string>;
  description: FormControl<string>;
  [key: string]: FormControl;
}

@Component({
  selector: 'app-create-product-form',
  templateUrl:
    './create-product-form.component.html',
  styleUrls: [
    './create-product-form.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductFormComponent
  implements OnInit
{
  createProductForm!: FormGroup<CreateProductFormProps>;
  fields!: Field[];
  categories!: Category[];
  subcategories!: string[];
  @Output() newProductEmitter =
    new EventEmitter<Product>();

  constructor(
    private createProductService: CreateProductService
  ) {}

  ngOnInit() {
    this.fields =
      this.createProductService.getFields();
    this.categories =
      this.createProductService.getCategories();
    this.subcategories =
      this.categories[0].subcategories;

    this.createProductForm = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      model: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      brand: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      ean: new FormControl(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.min(1000),
        ],
      }),
      price: new FormControl(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(
            /^[0-9]*(\.[0-9]{0,2})?$/
          ),
          Validators.min(1),
        ],
      }),
      amount: new FormControl(0, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.min(1),
        ],
      }),
      category: new FormControl(
        this.categories[0].mainCategory,
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      subcategory: new FormControl(
        this.subcategories[0],
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(400),
        ],
      }),
    });
  }

  checkIfValid(label: string): boolean {
    return (
      this.createProductForm.controls[label] &&
      this.createProductForm.controls[label].valid
    );
  }

  isDisabled(): boolean {
    return this.createProductForm.invalid;
  }

  onSetIndex(event: Event) {
    const select =
      event.target as HTMLSelectElement;

    this.subcategories =
      this.categories[
        select.options.selectedIndex
      ].subcategories;

    this.createProductForm.controls[
      'subcategory'
    ].setValue(this.subcategories[0]);
  }

  onSubmit() {
    let newProduct: Product = {
      name: '',
      brand: '',
      ean: 0,
      price: 0,
      amount: 0,
      category: '',
      subcategory: '',
      description: '',
      model: '',
    };

    for (let [key, FormControl] of Object.entries(
      this.createProductForm.controls
    )) {
      Object.defineProperty(newProduct, key, {
        value: parseFloat(FormControl.value)
          ? parseFloat(FormControl.value)
          : FormControl.value,
      });
    }
    this.newProductEmitter.emit(
      newProduct as Product
    );
    this.createProductForm.reset();
  }
}
