import { Component } from '@angular/core';

import { CartService } from '../../shared';

@Component({
  selector: 'cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent {
  constructor(
    public cartService: CartService
  ){}

  public trackByIndex(index: number): number {
    return index;
  }

  public get cartInfo(): string {
    switch (this.cartService.amountInCart) {
      case 0:
        return 'CART IS EMPTY';
      case 1:
        return '1 ITEM IN CART';
      default:
        return `${this.cartService.amountInCart} ITEMS IN CART`;
    }
  }

  public get totalSum(): number {
    if (!this.cartService.amountInCart) return 0;

    return this.cartService.productsInCart
      .map(product => product.price)
      .reduce((prev, next) => prev + next);
    };
}
