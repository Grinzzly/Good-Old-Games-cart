import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Product } from '../../../shared';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input()
  public addProduct: (id: number) => void;
  @Input()
  public inCart: boolean;
  @Input()
  public owned: boolean;
  @Input()
  public product: Product;

  constructor(
    private currencyPipe: CurrencyPipe
  ) {}

  public get buttonBadge(): string {
    if (this.owned) return 'OWNED';

    if (this.inCart) return 'IN CART';

    return this.currencyPipe.transform(this.product.price, 'USD', 'symbol');
  }

  public get classList(): string {
    if (this.owned) {
      return 'product__badge product__badge--owned';
    }

    if (this.inCart) {
      return 'product__badge product__badge--in-cart';
    }

    return 'product__badge';
  }
}
