import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { ProductsUrl } from './urls';
import { CartItems, ProductsResponseModel } from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class BehaviourService {
  private products = new BehaviorSubject<ProductsResponseModel[] | null>(null);
  public products$ = this.products.asObservable();

  private cart = new BehaviorSubject<CartItems>({
    total: 0,
    items: []
  });
  public cart$ = this.cart.asObservable();

  protected scrollToCart = new BehaviorSubject<boolean>(false);
  public scrollToCart$ = this.scrollToCart.asObservable();

  constructor(
    @Inject('FAKEAPI_BASE_URL') private fakeapiBaseUrl: string,
    private http: HttpClient
  ) {}

  setScrollToCart(value: boolean) {
    this.scrollToCart.next(value);
  }

  public getAllProducts() {
    this.http
      .get<ProductsResponseModel[] | null>(ProductsUrl.get(this.fakeapiBaseUrl)).pipe(retry(1))
      .subscribe({
        next: (value: ProductsResponseModel[] | null) => {
          this.products.next(value);
        },
      });
  }

  public addToCart(item: ProductsResponseModel) {
    const oldItems = this.cart.getValue();
    const findItem = oldItems.items.findIndex((items) => items.id === item.id);
    if(findItem > -1) {
      oldItems.items[findItem].quantity = (oldItems.items[findItem].quantity || 1) + 1;
      oldItems.total += item.price;
      oldItems.items[findItem].totalPrice = item.price * oldItems.items[findItem].quantity;

    } else {
      oldItems.items.push({...item, quantity: 1, totalPrice: item.price });
      oldItems.total += item.price;
    }
    this.cart.next(oldItems);
  }

  public updateQuntity(index: number, quantity: number) {
    const oldItems = this.cart.getValue();
    if(index > -1) {
      console.log('oldItems.items[index]', oldItems.items[index].price)
      oldItems.items[index].quantity = quantity;
      oldItems.items[index].totalPrice = oldItems.items[index].price * quantity;
      oldItems.total = 0;
      oldItems.items.forEach((item) => {
        oldItems.total += item.totalPrice ?? 0;
      });
      
      this.cart.next(oldItems);
    }
  }

  public removeItem(index: number) {
    const oldItems = this.cart.getValue();
    if (index > -1) {
      oldItems.total -= oldItems.items[index].totalPrice ?? 0;
      oldItems.items.splice(index, 1);
      this.cart.next(oldItems);
    }
  }
}
