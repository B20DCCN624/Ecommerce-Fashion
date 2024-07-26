import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Fashion } from '../../fashion';
import { FashionService } from '../../fashion.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzGridModule,
    NzPaginationModule,
    NgxPaginationModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [FashionService]
})
export class HomeComponent implements OnInit{
  allFashion: Fashion [] = [];
  allTopSeller: Fashion [] = [];
  p: number = 1;
  productName: string = '';

  banners: {image: string} [] = [
    { image: 'assets/banner1.png' },
    { image: 'assets/banner2.png' },
    { image: 'assets/banner3.jpg' }
  ]
  currentBannerIndex: number = 0;
  bannerInterval: any;

  constructor(
    private fashionService: FashionService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fashionService.getAllFashion().subscribe( data => {
      this.allFashion = data;
    })

    this.fashionService.getTopSeller().subscribe( data => {
      this.allTopSeller = data;
    })
  }

  prevBanner() {
    this.currentBannerIndex = (this.currentBannerIndex - 1 + this.banners.length) % this.banners.length;
  }

  nextBanner() {
    this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
  }

  //Search by name
  onSubmit() {
    this.searchProduct(this.productName);
    console.log(this.productName);
    this.productName="";
  }
  private searchProduct(name : string) {
    this.fashionService.searchByName(name).subscribe(data => {
      this.allFashion = data;
      console.log(data);
    })
  }
}
