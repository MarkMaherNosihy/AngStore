import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../services/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading: boolean = true;
  categories: any[] = ['All'];
  selectedCategory!: string;
  constructor(private productService: ProductsService
    ,private _snackBar: MatSnackBar, private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  getAllProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err: any) => {
        this._snackBar.open('An Error has occured', "Okay")
      },
      complete: ()=>{
        this.isLoading = false;
      }
    });
  }
  getAllCategories(){

    this.categoryService.getCategories().subscribe({
      next: (res: any)=>{
        this.categories.push(...res);
      },
      error: (err: any)=>{
        this._snackBar.open('An Error has occured', "Okay")
      }

    })
  }
  getSelectedCategory(){

    if(this.selectedCategory.toLowerCase() === 'all'){
      this.getAllProducts();
      return;
    }
    this.isLoading = true;
    this.categoryService.getSelectedCategory(this.selectedCategory).subscribe({
      next: (res: any)=>{
        this.products = res;
      },
      error: (err: any)=>{
        this._snackBar.open('An Error has occured', "Okay")
      },
      complete: ()=>{
        this.isLoading = false;
      }
    })
  }
  formatTitle(title: string) {
    if (title.length >= 60) {
      return title.slice(0, 60) + '...';
    } else {
      return title;
    }
  }
}
