import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }


  getCategories(){
    return this.httpClient.get(env.baseApi + "products/categories");
  }
  getSelectedCategory(category: string){
    return this.httpClient.get(env.baseApi + `products/category/${category}`);
  }
}
