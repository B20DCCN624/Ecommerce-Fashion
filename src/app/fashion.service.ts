import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Fashion } from './fashion';
import { CartItem } from './cart';
import { Account } from './account';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class FashionService {

  constructor(
    private httpClient:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAuthHeaders() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        }),
        withCredentials: true
      };
    } else {
      return {
        headers: new HttpHeaders(),
        withCredentials: true
      };
    }
  }

  //Fashion
  getAllFashion() {
    return this.httpClient.get<Fashion[]>('http://localhost:3000/home', this.getAuthHeaders());
  }

  detailFashion(id: string) {
    return this.httpClient.get<Fashion>(`http://localhost:3000/detail/${id}`);
  }

  getTopSeller() {
    return this.httpClient.get<Fashion[]>('http://localhost:3000/top-seller', this.getAuthHeaders());
  }

  searchByName(name : string) {
    return this.httpClient.get<Fashion[]>(`http://localhost:3000/searchByName?name=${name}`);
  }

  //Order
  addOrder(data : Order) {
    return this.httpClient.post<Order>('http://localhost:3000/order', data);
  }

  gtAllOrder() {
    return this.httpClient.get<Order[]>('http://localhost:3000/getAllOrder');
  }

  //Admin
  createFashion(data : Fashion) {
    return this.httpClient.post<Fashion>('http://localhost:3000/add', data, this.getAuthHeaders());
  }

  deleteFashion(id: String) {
    return this.httpClient.delete<Fashion>(`http://localhost:3000/delete/${id}`);
  }

  updateFashion(data : Fashion) {
    return this.httpClient.put<Fashion>(`http://localhost:3000/update/${data._id}`, data);
  }

  editFashion(id: String) {
    return this.httpClient.get<Fashion>(`http://localhost:3000/edit/${id}`);
  }

  //Cart
  addToCart(data: CartItem) {
    return this.httpClient.post<Fashion>('http://localhost:3000/addtocart', data);
  }

  getAllCart() {
    return this.httpClient.get<CartItem[]>('http://localhost:3000/getAllCart', this.getAuthHeaders());
  }

  deleteItem(id: string) {
    return this.httpClient.delete<CartItem>(`http://localhost:3000/deleteItem/${id}`);
  }

  clearData() {
    return this.httpClient.delete<CartItem>('http://localhost:3000/clearCart');
  }

  //Login
  login(username: string, password: string): Observable<Account> {
    return this.httpClient.post<Account>('http://localhost:3000/login', { username, password }, this.getAuthHeaders());
  }

  register(username: string, password: string, role: string) {
    return this.httpClient.post<Account>('http://localhost:3000/register', {username, password, role  });
  }

  getAllAccount() {
    return this.httpClient.get<Account[]>('http://localhost:3000/getAllAccount');
  }
}
