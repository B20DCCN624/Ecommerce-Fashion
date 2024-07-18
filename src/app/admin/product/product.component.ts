import { Component, OnInit } from '@angular/core';
import { FashionService } from '../../fashion.service';
import { Fashion } from '../../fashion';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  allFashion: Fashion [] = []

  constructor(
    private fashionService: FashionService
  ) {}

  ngOnInit(): void {
      this.fashionService.getAllFashion().subscribe( data => {
        this.allFashion = data
      })
  }

  deleteItem(id: String) {
    this.fashionService.deleteFashion(id).subscribe( data => {
      this.allFashion = this.allFashion.filter(item => item._id !== id);
    })
  }
}
