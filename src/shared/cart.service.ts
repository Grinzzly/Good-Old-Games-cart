import { Injectable } from '@angular/core';

import { ProductsService, Product } from './products.service';
import { BaseComponent } from './base.component';

@Injectable()
export class CartService extends BaseComponent{
  public productsInCart: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) {
    super();
  }

  public addProduct = (id: number) => {
    if (this.isInCart(id)) return;

    const product: Product = this.productsService.get(id);
    this.productsInCart.push(product);
  };

  public removeProduct = (id: number) => {
    this.productsInCart = this.productsInCart.filter(product => product.id !== id);
  };

  public get amountInCart(): number {
    return this.productsInCart.length;
  };

  public isInCart = (id: number): boolean => {
    return !!(this.productsInCart && this.productsInCart.find(product => product.id === id));
  };

  public clearCart(): void {
    this.productsInCart = [];
  };
}
