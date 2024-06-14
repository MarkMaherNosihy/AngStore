import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {formatLength} from '../../utils/utils';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { Product } from '../../models/product';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSnackBarModule, RouterModule, StarRatingModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  addToCartBtnText: string = 'Add to cart';
  addToCartBtnColor: string = 'primary';
  constructor( private cartService: CartService, private _matSnack: MatSnackBar){

  }
  formatTitle(title: string, length: number){
    return formatLength(title, length);
  }

  addToCart(event: any){
    event.stopPropagation();
    const isAdded = this.cartService.addToCart(this.product);
    isAdded ? this._matSnack.open("Item added to cart successfully", "Okay") : this._matSnack.open(`Item already exists, quantity increased`, "Okay");
    this.addToCartBtnText = 'Added';
    this.addToCartBtnColor = 'accent';
    setTimeout(()=>{
      this.addToCartBtnText = 'Add to cart'
      this.addToCartBtnColor = 'primary'
      this._matSnack.dismiss();
    },1500)
  }
}
