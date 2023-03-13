import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-pagination[productsNumber]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent
  implements OnInit
{
  @Input() productsNumber!: number;
  @Input() selectedIndex!: number;
  private labels: number[] = [];

  constructor() {}

  getLabels() {
    return this.labels;
  }

  ngOnInit(): void {
    this.setLabels();
  }

  setLabels() {
    for (
      let i = 1;
      i <= this.productsNumber;
      ++i
    ) {
      this.labels.push(i);
    }
  }
}
