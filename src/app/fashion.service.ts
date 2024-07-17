import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      withCredentials: true
    };
  }

  //Fashion
  getAllFashion() {
    return this.httpClient.get<Fashion[]>('http://localhost:3000/home', this.getAuthHeaders());
  }

  detailFashion(id: string) {
    return this.httpClient.get<Fashion>(`http://localhost:3000/${id}`);
  }

  createFashion(data : Fashion) {
    return this.httpClient.post<Fashion>('http://localhost:3000/add', data, this.getAuthHeaders());
  }

  getTopSeller() {
    return this.httpClient.get<Fashion[]>('http://localhost:3000/top-seller', this.getAuthHeaders());
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
    return this.httpClient.post<Account>('http://localhost:3000/login', { username, password }, this.getAuthHeaders());
  }

  register(username: string, password: string, role: string) {
    return this.httpClient.post<Account>('http://localhost:3000/register', {username, password, role  });
  }
}
