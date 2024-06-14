import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
export const routes: Routes = [
    {path:'cart', component: MainLayoutComponent, children: [
        {path: '', component: CartComponent}
    ]},
    {path:'products', component: MainLayoutComponent, children: [
        {path: '', component: ProductsComponent}
    ]},
    {path:'details/:id', component: MainLayoutComponent, children: [
        {path: '', component: ProductDetailsComponent}
    ]},
    {path:'admin/dashboard', component: AdminLayoutComponent, children:[
        {path: '', component: DashboardComponent, children:[
            {path: 'products', component:ManageProductsComponent }
        ]},
        
    ]},
    {path:'**', redirectTo: 'products', pathMatch: "full"}
];
