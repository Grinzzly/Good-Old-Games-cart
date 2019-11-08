import { Component, ViewEncapsulation } from '@angular/core';

import { CartService } from '../shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public isCartOpen: boolean = false;

  constructor(
    private cartService: CartService
  ){ }

  public get productsAmountInCart(): number {
    return this.cartService.productsInCart.length;
  }

  public toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
