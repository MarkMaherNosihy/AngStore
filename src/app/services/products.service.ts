import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../env/env';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(){
    return this.httpClient.get<Product[]>(`${env.baseApi}products`)
  }

  getProductByID(id:number){
    return this.httpClient.get<Product>(`${env.baseApi}products/${id}`);
  }
}
