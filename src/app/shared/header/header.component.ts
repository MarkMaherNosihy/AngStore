import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartQuantity: number = 0;
  subscription!: Subscription;
  constructor(private cartService: CartService){

  }
ngOnInit(): void {
  this.cartQuantity = this.cartService.getUpdatedCartQuantity();
  this.subscription = this.cartService.numOfItemsInCart.subscribe((quantity)=>{
    this.cartQuantity = quantity;
  })
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
  
}
