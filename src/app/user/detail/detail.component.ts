import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { addDays, formatDistance } from 'date-fns';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FashionService } from '../../fashion.service';
import { Fashion } from '../../fashion';
import { CartItem } from '../../cart';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { OrderItem } from '../../orderItem';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../../review';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    NzTabsModule,
    NzCommentModule,
    NzAvatarModule,
    NzListModule,
    CommonModule,
    RouterLink,
    NzBreadCrumbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [FashionService]
})
export class DetailComponent implements OnInit{

  formData!: Fashion | undefined;
  allReview: Review [] = []
  dataReview: Review = {
    name: 'admin',
    image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    comment: ''
  }

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {};

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if(token) {
        this.route.paramMap.subscribe(param => {
          let id = String(param.get('id'));
          this.getById(id);
        })

        this.loadReviews();
      } else {
        this.router.navigate(['/about']);
      }
    }
  }

  getById(id: string) {
    this.fashionService.detailFashion(id).subscribe( data => {
      this.formData = data;
      // console.log("This is data", this.formData);
    })
  }

  //addtocart
  addToCart() {
    if(this.formData) {
      const cartItem: CartItem = {
        _id:'',
        id: this.formData._id,
        name: this.formData.name,
        price: this.formData.newPrice,
        image: this.formData.image,
        quantity: 1,
        total: Number(this.formData.newPrice) * 1,
      };

      const orderItem: OrderItem = {
        _id:'',
        id: this.formData._id,
        name: this.formData.name,
        price: this.formData.newPrice,
        image: this.formData.image,
      }
      //
      this.fashionService.getCartItemById(this.formData._id).subscribe( data => {
        if(data) {
          data.quantity = Number(data.quantity) + 1;
          data.total = Number(data.quantity) * Number(data.price);
          this.fashionService.updateCart(data).subscribe( data => {
            this.router.navigate(['/cart']);
          })
        } else {
          this.fashionService.addToCart(cartItem).subscribe( data => {
            console.log(data);
            this.router.navigate(['/cart']);
          })
        }
      })
      //
      this.fashionService.getOrderById(this.formData._id).subscribe(existingItem => {
        if (!existingItem) {
          this.fashionService.addToOrder(orderItem).subscribe(data => {
            console.log(data);
          });
        } else {
          console.log('Item already exists in the order.');
        }
      });

      this.fashionService.addToOrder(orderItem).subscribe(data => {
        console.log(data);
      });
    }
  }

  loadReviews() {
    this.fashionService.getAllReview().subscribe( data => {
      this.allReview = data;
    })
  }

  onSubmit() {
    this.fashionService.addReview(this.dataReview).subscribe( data => {
      console.log(data);
      this.dataReview.comment = '';
      this.loadReviews();
    })
  }
}
