import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../cart';
import { FashionService } from '../../fashion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orderuser',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './orderuser.component.html',
  styleUrl: './orderuser.component.css'
})
export class OrderuserComponent implements OnInit{
  allCart: CartItem [] = []

  constructor(
    private fashionService: FashionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
      this.fashionService.getAllOrder().subscribe( data => {
        this.allCart = data;
        // console.log(data);
      })
  }
}
