import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  cartItems: any[] = [];
  cartItemsChanged: Subject<any> = new Subject<any>();
  numOfItemsInCart: Subject<number> = new Subject<number>();
  totalCartPriceChanged: Subject<number> = new Subject<number>();
  totalCartPrice!: number;
  getCartItems() {
    const cartItem = localStorage.getItem('cart');
    if (cartItem !== null) {
      return JSON.parse(cartItem);
    }
  }
  deleteCartItem(itemID: string) {
    this.cartItems = this.getCartItems();
    const newCartItems = this.cartItems.filter((item) => {
      return item.id !== itemID;
    });
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    this.getUpdatedCartQuantity();
    this.totalPriceChanged();
    this.cartItemsChanged.next(newCartItems);
  }
  getUpdatedCartQuantity() {
    this.cartItems = this.getCartItems();
    let totalQuantity: number = 0;
    this.cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
    this.numOfItemsInCart.next(totalQuantity);
    return totalQuantity;
  }

  increaseQuantity(id: number) {
    this.cartItems = this.getCartItems();
    this.cartItems.forEach((item) => {
      if(item.id === id){
        item.quantity += 1;
        return;
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.totalPriceChanged();
    this.getUpdatedCartQuantity();
  }
  decreaseQuantiy(id: number) {
    this.cartItems = this.getCartItems();
    this.cartItems.forEach((item) => {
      if(item.id === id && item.quantity > 1){
        item.quantity -= 1;
        return;
      }
    });
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.getUpdatedCartQuantity();
      this.totalPriceChanged();
      return 
    } 
  calculateCartTotal(){
    this.cartItems = this.getCartItems();
    this.totalCartPrice = 0;
    this.cartItems.forEach((item) => {
        this.totalCartPrice += item.price * item.quantity;
    });
    return this.totalCartPrice;  
  }
  totalPriceChanged(){
    this.calculateCartTotal();
    this.totalCartPriceChanged.next(this.totalCartPrice);
  }
  
  addToCart(product: any) {
    if ('cart' in localStorage) {
      const alreadyExists = this.getCartItems().find((item: any) => {
        return item.id === product.id;
      });

      if (alreadyExists) {
        this.cartItems = this.getCartItems();
        this.cartItems.forEach((item) => {
          if (item.id === alreadyExists.id) {
            item.quantity += 1;
          }
        });
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.getUpdatedCartQuantity();
        this.totalPriceChanged();
        return false;
      } else {
        this.cartItems = this.getCartItems();
        this.cartItems.push({ ...product, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.getUpdatedCartQuantity();
        this.totalPriceChanged();
        return true;
      }
    }
    return false;
  }
}
