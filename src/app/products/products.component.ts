import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, MatSelectModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: any [] = [];

  categories = [
    'Shoes',
    'Tops',
    'Pants',
    'Shorts'
  ]

  constructor(private productService: ProductsService){

  }
  ngOnInit(): void {
    this.getAllProducts();
  }
   getAllProducts(){
    this.productService.getProducts().subscribe((res: any)=>{
      console.log(res);
      this.products = res;
    })
  }

  formatTitle(title: string){
    if(title.length >= 60){
      return title.slice(0, 60) + '...';
    }else{
      return title;
    }
  }
}
