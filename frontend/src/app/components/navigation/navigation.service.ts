import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Link {
  label: string;
  href: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private links: Link[] = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: 'bi bi-house-door',
    },
    {
      href: 'create-product',
      label: 'Add Product',
      icon: 'bi bi-plus',
    },
    {
      href: 'account',
      label: 'Account',
      icon: 'bi bi-person',
    },
  ];
  constructor() {}

  getLinks(): Observable<Link[]> {
    return of(this.links);
  }
}
