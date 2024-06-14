import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, StarRatingModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}
  id: number = this.route.snapshot.params['id'];
  isLoading: boolean = true;
  productDetails!: Product;
  addToCartText:string = 'Add to cart';
  addToCartColor:string = 'primary';

  ngOnInit(): void {
    this.productService.getProductByID(this.id).subscribe({
      next: (res) => {
        this.productDetails = res;
        console.log(res);
      },
      error: (err) => {
        console.log('An error has occured');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  addToCart(){
    this.cartService.addToCart(this.productDetails);
    this._snackBar.open('Product added to cart successfully.', 'Okay');
    this.addToCartText = 'Added successfully.';
    this.addToCartColor = 'accent';
    setTimeout(()=>{
      this.addToCartText = 'Add to cart';
      this.addToCartColor = 'primary';
      this._snackBar.dismiss();
    }, 1500);
  }

}
