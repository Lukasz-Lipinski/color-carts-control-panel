import { Injectable } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastDirective } from './toast.directive';
import { BackendRes } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  timer: any;
  constructor() {}

  createComponent(
    vcr: ToastDirective,
    details: BackendRes
  ) {
    vcr.viewContainerRef.clear();
    const toast =
      vcr.viewContainerRef.createComponent(
        ToastComponent
      );
    toast.instance.details = details;

    this.destroyComponent(vcr);
  }

  destroyComponent(vcr: ToastDirective) {
    this.timer = setTimeout(() => {
      vcr.viewContainerRef.clear();
      vcr.viewContainerRef.remove();
    }, 1999);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
