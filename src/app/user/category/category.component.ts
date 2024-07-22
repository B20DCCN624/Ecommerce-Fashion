import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Fashion } from '../../fashion';
import { FashionService } from '../../fashion.service';
import { RouterLink } from '@angular/router';

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
    private fashionService: FashionService
  ) {}

  ngOnInit(): void {
      this.fashionService.getAllFashion().subscribe( data => {
        this.allFashion = data;
        data.forEach((item: Fashion) => {
          if(!this.categories.includes(item.category)) {
            this.categories.push(item.category);
          }
        })
      });
  }

  getProductByCategory(category: string) {
    return this.allFashion.filter(item => item.category === category);
  }
}
