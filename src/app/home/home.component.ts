import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fashion } from '../fashion';
import { FashionService } from '../fashion.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzGridModule,
    NzPaginationModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [FashionService]
})
export class HomeComponent implements OnInit{
  allFashion: Fashion [] = [];
  allTopSeller: Fashion [] = [];
  paginateFashion: Fashion [] = [];
  pageSize = 8;
  pageIndex = 1;
  productName: string = '';

  constructor(private fashionService: FashionService) {}

  ngOnInit(): void {
      this.fashionService.getAllFashion().subscribe( data => {
        this.allFashion = data;
        this.loadPage(this.pageIndex);
      })

      this.fashionService.getTopSeller().subscribe( data => {
        this.allTopSeller = data;
      })
  }
  //Phan trang
  loadPage(page: number) {
    const startIndex = (page-1) * this.pageSize;
    const endIndex = page * this.pageSize;
    this.paginateFashion = this.allFashion.slice(startIndex, endIndex);
  }

  onPageChange(page : number) {
    this.pageIndex = page;
    this.loadPage(page);
  }

  //Search by name
  onSubmit() {
    this.searchProduct(this.productName);
    console.log(this.productName);
    this.productName="";
  }
  private searchProduct(name : string) {
    this.fashionService.searchByName(name).subscribe(data => {
      this.paginateFashion = data;
      console.log(data);
    })
  }
}
