import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardHomeResolver } from './dashboard/dashboard-home/dashboard-home.resolver';
import { UserDataResolver } from './user-data/user-data.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    // canMatch: [DashboardGuard],
    loadComponent: () =>
      import(
        './dashboard/dashboard.component'
      ).then((m) => m.DashboardComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './dashboard/dashboard-home/dashboard-home.component'
          ).then((m) => m.DashboardHomeComponent),
        resolve: {
          products: DashboardHomeResolver,
        },
      },
      {
        path: 'account',
        loadComponent: () =>
          import(
            './user-data/user-data.component'
          ).then((m) => m.UserDataComponent),
        resolve: {
          userData: UserDataResolver,
        },
      },
      {
        path: 'create-product',
        loadComponent: () =>
          import(
            './create-product/create-product.component'
          ).then((m) => m.CreateProductComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
