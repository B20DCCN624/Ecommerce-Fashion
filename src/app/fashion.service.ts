import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fashion } from './fashion';
import { CartItem } from './cart';
import { Account } from './account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FashionService {

  constructor(private httpClient:HttpClient) { }
  //Fashion
  getAllFashion() {
    return this.httpClient.get<Fashion[]>('http://localhost:3000/');
  }

  detailFashion(id: string) {
    return this.httpClient.get<Fashion>(`http://localhost:3000/${id}`);
  }

  createFashion(data : Fashion) {
    return this.httpClient.post<Fashion>('http://localhost:3000/add', data);
  }

  getTopSeller() {
    return this.httpClient.get<Fashion[]>('http://localhost:3000/top-seller');
  }

  searchByName(name : string) {
    return this.httpClient.get<Fashion[]>(`http://localhost:3000/searchByName?name=${name}`);
  }

  //Cart
  addToCart(data: CartItem) {
    return this.httpClient.post<Fashion>('http://localhost:3000/addtocart', data);
  }

  getAllCart() {
    return this.httpClient.get<CartItem[]>('http://localhost:3000/getAllCart');
  }

  deleteItem(id: string) {
    return this.httpClient.delete<CartItem>(`http://localhost:3000/deleteItem/${id}`);
  }

  //Login
  login(username: string, password: string): Observable<Account> {
    return this.httpClient.post<Account>('http://localhost:3000/login', {username, password});
  }

  register(username: string, password: string) {
    return this.httpClient.post<Account>('http://localhost:3000/register', {username, password});
  }
}
