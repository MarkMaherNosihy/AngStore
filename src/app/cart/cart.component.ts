import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{

  cartItems: any[]= [];
  numOfCartItems!: number;
  cartItemsSubscription!: Subscription;
  cartQuantitySubscription!: Subscription;
  totalPrice!: number;
  constructor(private cartService:CartService){

  }
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItemsSubscription = this.cartService.cartItemsChanged.subscribe((updatedCartItems)=>{
      this.cartItems = updatedCartItems;
    })
    this.numOfCartItems = this.cartService.getUpdatedCartQuantity();
    this.cartQuantitySubscription = this.cartService.numOfItemsInCart.subscribe((quantity)=>{
      this.numOfCartItems = quantity;
    })
    this.totalPrice = this.cartService.calculateCartTotal();
    this.cartService.totalCartPriceChanged.subscribe((total)=>{
      this.totalPrice = total;
    })
  }

ngOnDestroy(): void {
  this.cartItemsSubscription.unsubscribe();
  this.cartQuantitySubscription.unsubscribe();
}
}
