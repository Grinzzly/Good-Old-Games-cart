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
    public cartService: CartService
  ){ }

  public toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }
}
