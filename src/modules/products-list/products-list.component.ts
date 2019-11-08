import { Component, Input } from '@angular/core';

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
    private productsService: ProductsService
  ) {
    super();

    this.addSubscription(this.productsService.products$.subscribe(products => {
      this.products = products;
    }));

    this.addSubscription(this.productsService.ownedProductIds$.subscribe(productIds => {
      this.ownedProductIds = productIds;
    }));
  }

  public isOwned(id: number): boolean {
    return this.ownedProductIds.includes(id);
  }
}
