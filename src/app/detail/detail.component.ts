import { Component, OnInit } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { addDays, formatDistance } from 'date-fns';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FashionService } from '../fashion.service';
import { Fashion } from '../fashion';
import { CartItem } from '../cart';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


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
    NzBreadCrumbModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [FashionService]
})
export class DetailComponent implements OnInit{
  data = [
    {
      author: 'Cr7',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 2))
    }
  ];
  // formData: Fashion = {
  //   _id: '',
  //   name: '',
  //   rating: 0,
  //   oldPrice: 0,
  //   newPrice: 0,
  //   description: '',
  //   image: '',
  //   quantity: 0,
  //   category: '',
  // }

  formData!: Fashion | undefined;

  constructor(
    private fashisonService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      let id = String(param.get('id'));
      this.getById(id);
    })
  }

  getById(id: string) {
    this.fashisonService.detailFashion(id).subscribe( data => {
      this.formData = data;
      // console.log("This is data", this.formData);
    })
  }

  //addtocart
  addToCart() {
    if(this.formData) {
      const cartItem: CartItem = {
        _id:'',
        name: this.formData.name,
        price: this.formData.newPrice,
        image: this.formData.image,
        quantity: 1,
        total: Number(this.formData.newPrice) * 1,
      };
      this.fashisonService.addToCart(cartItem).subscribe( data => {
        console.log(data);
        this.router.navigate(['/cart']);
      })
    }
  }
}
