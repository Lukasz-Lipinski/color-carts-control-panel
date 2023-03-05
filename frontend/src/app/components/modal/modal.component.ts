import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export interface ModalDetails {
  title: string;
}

@Component({
  selector: 'app-modal[modalDetails]',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() modalDetails!: ModalDetails;
  @Output() closeDialogEmitter =
    new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.closeDialogEmitter.emit();
  }

  onStopPag(e: Event) {
    e.stopPropagation();
  }
}
