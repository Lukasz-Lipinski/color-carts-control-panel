import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BackendRes } from '../auth/auth.service';

@Component({
  selector: 'app-toast[details]',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() details: BackendRes | null = null;
  timer: any;

  constructor() {}

  ngOnInit() {
    this.timer = setTimeout(() => {
      this.onHideToast();
    }, 2000);
  }

  onHideToast() {
    this.details = null;
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
