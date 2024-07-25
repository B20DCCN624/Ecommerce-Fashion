import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FashionService } from '../../fashion.service';
import { CartItem } from '../../cart';
import { Order } from '../../order';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NzBreadCrumbModule,
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [NzModalService],
})
export class CheckoutComponent implements OnInit {
  allCartItem: CartItem[] = [];
  total: number = 0;

  confirmModal?: NzModalRef;

  formData: Order = {
    fullname: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    total: 0
  }

  constructor(
    private fashionService: FashionService,
    private modal: NzModalService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  orderForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
  })

  showConfirm() {
    this.formData.total = this.total;
    //update quantity, sold
    this.fashionService.updateProductQuantity(this.allCartItem).subscribe( () => {

    })
    this.fashionService.addOrder(this.formData).subscribe( data => {
      // console.log(data);
      this.orderForm.reset();
      this.clearData();
    })

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

  clearData() {
    this.fashionService.clearData().subscribe(data => {
      this.total = 0;
    })
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.fashionService.getAllCart().subscribe((data) => {
          this.allCartItem = data;
          this.totalPrice();
        });
      } else {
        this.router.navigate(['/about']);
      }
    }
  }

  totalPrice() {
    this.total = this.allCartItem.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity),0);
    this.formData.total = this.total;
  }
}
