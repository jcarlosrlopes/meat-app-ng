import { Injectable } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';

@Injectable()
export class ShoppingCartService {

  items: CartItem[] = [];

  constructor() { }

  clear() {
    this.items = [];
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find(cItem => cItem.menuItem.id === item.id);
    
    if (foundItem) {
      foundItem.quantity++;
    } else {
      this.items.push(new CartItem(item));
    }
  }

  increaseQty(item: CartItem) {
    item.quantity++;
  }

  decreaseQty(item: CartItem) {
    item.quantity--;
    if (!item.quantity) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  total(): number {
    return this.items.map(item => item.value())
    .reduce((prev, value) => prev + value, 0);
  }



}
