import { Component } from '@angular/core';

import { CartService } from '../shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string;

  constructor(
    private cartService: CartService
  ){
    this.title = cartService.title;
  }
}
