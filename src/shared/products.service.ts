import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Product {
  id: number,
  price: number,
  title: string,
  discount: number,
  image: string
}

@Injectable()
export class ProductsService {
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  private productsUrl: string = 'assets/products.json';

  constructor(
    private http: HttpClient
  ) {
    this.getProducts();
  }

  public get products$(): Observable<Product[]> {
    return this.products;
  }

  public get(id: number): Product {
    return this.products.getValue().find(product => product.id === id);
  };

  private getProducts() {
    return this.http.get(this.productsUrl).subscribe((products: Product[]) => {
      this.products.next(products);
    });
  }
}
