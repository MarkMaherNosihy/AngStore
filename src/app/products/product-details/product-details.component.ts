import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, StarRatingModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}
  id: number = this.route.snapshot.params['id'];
  isLoading: boolean = true;
  productDetails: any;
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
}
