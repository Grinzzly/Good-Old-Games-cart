import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Product {
  id: number,
  price: number,
  title: string,
  image: string,
  discount?: number
}

export interface UserData {
  ownedProductsIds: number[]
}

@Injectable()
export class ProductsService {
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private ownedProductIds: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  private productsUrl: string = 'assets/products.json';
  private userDataUrl: string = 'assets/userData.json';

  constructor(
    private http: HttpClient
  ) {
    this.getProducts();
    this.getUserProducts();
  }

  public get products$(): Observable<Product[]> {
    return this.products;
  }

  public get ownedProductIds$(): Observable<number[]> {
    return this.ownedProductIds;
  }

  public get(id: number): Product {
    return this.products.getValue().find(product => product.id === id);
  };

  private getProducts() {
    return this.http.get(this.productsUrl).subscribe((products: Product[]) => {
      this.products.next(products);
    });
  }

  private getUserProducts() {
    return this.http.get(this.userDataUrl).subscribe((userData: UserData) => {
      this.ownedProductIds.next(userData.ownedProductsIds);
    });
  }
}
