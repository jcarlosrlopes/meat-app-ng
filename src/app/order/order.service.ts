import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import { MEAP_API } from "app/app.api";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { Observable } from "rxjs";
import { Order, OrderItem } from "./order.model";

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService, private http: Http){}

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  itemsValue(): number {
    return this.cartService.total()
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  checkOrder(order: Order): Observable<string> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`${MEAP_API}/orders`, JSON.stringify(order), new RequestOptions({headers: headers}))
      .map(response => response.json())
      .map(order => order.id);
  }

  clear() {
    this.cartService.clear();
  }

}