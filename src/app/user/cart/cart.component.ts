import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { Router, RouterLink } from '@angular/router';
import { FashionService } from '../../fashion.service';
import { CartItem } from '../../cart';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NzMenuModule,
    NzBreadCrumbModule,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  allCartItem: CartItem [] = [];
  total: number = 0;

  constructor(
    private fashionService: FashionService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {};

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if(token) {
        this.fashionService.getAllCart().subscribe( data => {
          this.allCartItem = data;
          this.totalPrice();
        })
      } else {
        this.router.navigate(['/about']);
      }
    }

  }

  decreaseQuantity(item: CartItem) {
    if(Number(item.quantity) > 1) {
      item.quantity = Number(item.quantity) - 1;
      this.updateTotal(item);
      this.updateCartItem(item);
    }
  }

  increaseQuantity(item: CartItem) {
    item.quantity = Number(item.quantity) + 1;
    this.updateTotal(item);
    this.updateCartItem(item);
  }

  updateTotal(item: CartItem): void {
    item.total = Number(item.price) * Number(item.quantity);
    this.totalPrice();
  }

  updateCartItem(item: CartItem) {
    this.fashionService.updateCart(item).subscribe( data => {

    })
  }

  totalPrice() {
    this.total = this.allCartItem.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  }

  deleteItem(id: string) {
    this.fashionService.deleteItem(id).subscribe( data => {
      this.allCartItem = this.allCartItem.filter(item => item._id !== id);
      this.totalPrice();
    })
  }
}
