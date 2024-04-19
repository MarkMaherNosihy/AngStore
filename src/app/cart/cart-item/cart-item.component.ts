import { Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,FormsModule,MatInputModule, MatFormFieldModule, MatSnackBarModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: any;
  quantity!: number;
  constructor(private cartService: CartService, private _snack: MatSnackBar){

  }
  ngOnInit(): void {
    this.quantity = this.cartItem.quantity;
  }
  deleteCartItem(){
    this.cartService.deleteCartItem(this.cartItem.id);
  }
  increaseQuantity(){
    this.cartService.increaseQuantity(this.cartItem.id);
    this.quantity += 1;
  }
  decreaseQuantity(){
    this.cartService.decreaseQuantiy(this.cartItem.id);
    if(this.quantity > 1){
      this.quantity -= 1;
    }else{
      this._snack.open("Minimum is quantity is 1", "Okay")
    }
  }
}
