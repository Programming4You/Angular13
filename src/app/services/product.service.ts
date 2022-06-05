import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Utils from '../shared/helpers/utils';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {  }

  postProduct(data:any){
    Utils.inputSelectedDateAndCurrentTime(data.date);
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }

  putProduct(data:any, id:number){
    Utils.inputSelectedDateAndCurrentTime(data.date);
    return this.http.put<any>("http://localhost:3000/productList/" + id, data);
  }

  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/" + id);
  }

  getProducts(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  getCompanies(){
    return this.http.get<any>("http://localhost:3000/companies/");
  }

  getCategories(){
    return this.http.get<any>("http://localhost:3000/categories/");
  }

  getProductStates(){
    return this.http.get<any>("http://localhost:3000/productStates/");
  }
}
