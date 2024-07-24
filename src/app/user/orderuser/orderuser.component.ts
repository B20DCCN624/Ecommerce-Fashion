import { Component, OnInit } from '@angular/core';
import { FashionService } from '../../fashion.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderItem } from '../../orderItem';

@Component({
  selector: 'app-orderuser',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './orderuser.component.html',
  styleUrl: './orderuser.component.css'
})
export class OrderuserComponent implements OnInit{
  allOrder: OrderItem [] = []

  constructor(
    private fashionService: FashionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fashionService.getAllOrder().subscribe( data => {
      this.allOrder = data;
    })
  }
}
