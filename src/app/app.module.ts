import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';

import { AppComponent } from './app.component';

import * as shared from '../shared';
import * as modules from '../modules';

@NgModule({
  declarations: [
    AppComponent,
    modules.CartViewComponent,
    modules.JumbotronComponent,
    modules.ProductComponent,
    modules.ProductsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  providers: [
    shared.CartService,
    shared.ProductsService,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
