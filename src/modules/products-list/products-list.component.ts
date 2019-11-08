import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ProductsService, Product } from '../../shared';
import { BaseComponent } from '../../shared/base.component';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends BaseComponent {
  @Input()
  public addProduct;

  @Input()
  public isInCart;

  public products: Product[] = [];
  public ownedProductIds: number[] = [];

  constructor(
    private productsService: ProductsService,
    private currencyPipe: CurrencyPipe
  ) {
    super();

    this.addSubscription(this.productsService.products$.subscribe(products => {
      this.products = products;
    }));

    this.addSubscription(this.productsService.ownedProductIds$.subscribe(productIds => {
      this.ownedProductIds = productIds;
    }));
  }

  public getButtonBadge(product: Product): string {
    if (this.isOwned(product.id)) {
      return 'OWNED';
    }

    if (this.isInCart(product.id)) {
      return 'IN CART';
    }

    return this.currencyPipe.transform(product.price, 'USD', 'symbol');
  }

  public isOwned(id: number): boolean {
    return this.ownedProductIds.includes(id);
  }
}
