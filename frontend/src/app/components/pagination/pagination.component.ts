import {
  ChangeDetectionStrategy,
  OnChanges,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination[indexes]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent
  implements OnInit
{
  @Input() indexes!: number;
  @Input() selectedIndex!: number;
  @Output() indexEmitter =
    new EventEmitter<number>();
  private labels: number[] = [];

  constructor() {}

  getLabels() {
    this.setLabels();
    return this.labels;
  }

  ngOnInit(): void {
    this.setLabels();
  }

  setLabels() {
    this.labels = [];
    for (let i = 1; i <= this.indexes; ++i) {
      this.labels.push(i);
    }
  }

  onChangePage(label: 'previous' | 'next') {
    label === 'next' &&
      this.selectedIndex < this.indexes &&
      this.indexEmitter.emit(
        ++this.selectedIndex
      );

    label === 'previous' &&
      this.selectedIndex > 1 &&
      this.indexEmitter.emit(
        --this.selectedIndex
      );
  }

  onSetExactIndex(index: number) {
    this.indexEmitter.emit(index);
  }
}
