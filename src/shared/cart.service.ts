import { Injectable } from '@angular/core';

export interface Product {
  id: number,
  price: number,
  title: string,
  discount: number,
  image: string
}

@Injectable()
export class CartService {
  public productsInCart: Product[] = [];

  public clearCart(): void {
    this.productsInCart = [];
  };

  public removeProduct(id: number): void {
    this.productsInCart = this.productsInCart.filter(product => product.id !== id);
  };
}
