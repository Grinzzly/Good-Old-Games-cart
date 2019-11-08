import { Component } from '@angular/core';

import { CartService } from '../shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  public countAddedProducts: number;

  public isCartOpen: boolean = false;

  constructor(
    private cartService: CartService
  ){
    this.countAddedProducts = this.cartService.productsInCart.length;
  }

  public toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
