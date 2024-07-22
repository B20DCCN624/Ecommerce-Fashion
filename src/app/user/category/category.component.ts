import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Fashion } from '../../fashion';
import { FashionService } from '../../fashion.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    NzTabsModule,
    RouterLink
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  allFashion: Fashion [] = []
  categories: string[] = []

  constructor(
    private fashionService: FashionService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if(token) {
        this.fashionService.getAllFashion().subscribe( data => {
          this.allFashion = data;
          data.forEach((item: Fashion) => {
            if(!this.categories.includes(item.category)) {
              this.categories.push(item.category);
            }
          })
        });
      } else {
        this.router.navigate(['/about'])
      }
    }
  }

  getProductByCategory(category: string) {
    return this.allFashion.filter(item => item.category === category);
  }
}
