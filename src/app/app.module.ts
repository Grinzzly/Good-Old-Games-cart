import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import * as shared from '../shared';

@NgModule({
  declarations: [
    AppComponent
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
