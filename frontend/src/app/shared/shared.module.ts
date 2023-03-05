import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeFormComponent } from './../components/home-form/home-form.component';
import { NavigationComponent } from './../components/navigation/navigation.component';
import { ToastComponent } from '../components/toast/toast.component';
import { ToastDirective } from '../components/toast/toast.directive';
import { ProductsListComponent } from '../components/products-list/products-list.component';
import { ProductItemComponent } from '../components/products-list/product-item/product-item.component';
import { CreateProductFormComponent } from '../components/create-product-form/create-product-form.component';
import { SearcherComponent } from '../components/searcher/searcher.component';
import { ModalComponent } from '../components/modal/modal.component';
import { UpdateProductFormComponent } from '../components/update-product-form/update-product-form.component';
import { UpdatedFormModalComponent } from '../components/updated-form-modal/updated-form-modal.component';
import { RemoveModalComponent } from '../components/remove-modal/remove-modal.component';

@NgModule({
  declarations: [
    HomeFormComponent,
    NavigationComponent,
    ToastComponent,
    ToastDirective,
    ProductsListComponent,
    ProductItemComponent,
    CreateProductFormComponent,
    SearcherComponent,
    ModalComponent,
    UpdateProductFormComponent,
    UpdatedFormModalComponent,
    RemoveModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    UpdatedFormModalComponent,
    RemoveModalComponent,
    UpdateProductFormComponent,
    ModalComponent,
    SearcherComponent,
    CreateProductFormComponent,
    ProductItemComponent,
    ToastDirective,
    ProductsListComponent,
    ToastComponent,
    HomeFormComponent,
    NavigationComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
