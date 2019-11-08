import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import * as shared from '../shared';
import * as modules from '../modules';

@NgModule({
  declarations: [
    AppComponent,
    modules.CartViewComponent,
    modules.JumbotronComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    shared.CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
