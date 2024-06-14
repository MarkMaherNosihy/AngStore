import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatDialogModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent implements OnInit {
  allProducts!:Product[];

  constructor(private productsService: ProductsService, private _dialog:MatDialog){

  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products)=>{
      this.allProducts = products;
    })
  }

  openDialog(){
    const dialogRef = this._dialog.open(NewProductDialog);
    
  }
}


@Component({
  selector: 'new-product-dialog',
  templateUrl: 'new-product-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule],
})
export class NewProductDialog {
  imageSrc!: any;
  previewImage(event: any){
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }  }
}