import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FashionService } from '../fashion.service';
import { CartItem } from '../cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NzBreadCrumbModule, CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [NzModalService],
})
export class CheckoutComponent implements OnInit {
  allCartItem: CartItem[] = [];
  total: number = 0;

  confirmModal?: NzModalRef;

  constructor(
    private fashionService: FashionService,
    private modal: NzModalService,
    private router: Router
  ) {}

  showConfirm() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'ORDER PLACED SUCCESSFULLY ❤️',
      nzContent:
        'Your order has been placed successfully. Thank you for shopping with us!',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!')),
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.fashionService.getAllCart().subscribe((data) => {
        this.allCartItem = data;
        this.totalPrice();
      });
    } else {
      this.router.navigate(['/noti']);
    }
  }

  totalPrice() {
    this.total = this.allCartItem.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity),0);
  }
}
