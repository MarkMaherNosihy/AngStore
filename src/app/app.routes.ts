import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
export const routes: Routes = [
    {path:'cart', component: CartComponent},
    {path:'products', component: ProductsComponent},
    {path:'details/:id', component: ProductDetailsComponent},
    {path:'**', redirectTo: 'products', pathMatch: "full"}
];
