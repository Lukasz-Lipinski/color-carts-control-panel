import {
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
} from '../create-product-form/create-product.service';

interface SearcherForm {
  searcher: FormControl<string>;
  category: FormControl<string>;
}

export interface SearcherParameters {
  product: string;
  category: string;
}

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent implements OnInit {
  searcherForm!: FormGroup;
  @Output() searcherEmitter =
    new EventEmitter<SearcherParameters>();
  categories!: Category[];

  constructor(
    private createProductService: CreateProductService
  ) {}

  ngOnInit(): void {
    this.searcherForm =
      new FormGroup<SearcherForm>({
        searcher: new FormControl<string>('', {
          nonNullable: true,
        }),
        category: new FormControl<string>('all', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      });

    this.categories =
      this.createProductService.getCategories();
  }

  onSearch(event?: KeyboardEvent | SubmitEvent) {
    const parameters: SearcherParameters = {
      category:
        this.searcherForm.controls['category']
          .value,
      product:
        this.searcherForm.controls['searcher']
          .value,
    };

    event instanceof KeyboardEvent &&
      event.code === 'Enter' &&
      this.searcherForm.valid &&
      this.searcherEmitter.emit(parameters);

    event instanceof SubmitEvent &&
      this.searcherForm.valid &&
      this.searcherEmitter.emit(parameters);
  }
}
