import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import * as shared from '../shared';
import * as modules from '../modules';

@NgModule({
  declarations: [
    AppComponent,
    modules.CartViewComponent,
    modules.JumbotronComponent,
    modules.ProductsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    shared.CartService,
    shared.ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
