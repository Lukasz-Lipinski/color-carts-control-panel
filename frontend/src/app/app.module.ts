import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { UpdatedFormModalComponent } from './components/updated-form-modal/updated-form-modal.component';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
  ],
  exports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
