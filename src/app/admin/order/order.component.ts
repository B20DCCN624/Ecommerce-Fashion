import { Component, OnInit } from '@angular/core';
import { Order } from '../../order';
import { FashionService } from '../../fashion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  allOrder: Order [] = []

  constructor(
    private fashionService: FashionService
  ) {}

  ngOnInit(): void {
    this.fashionService.gtAllOrder().subscribe( data => {
      this.allOrder = data;
      console.log(this.allOrder);
    })
  }
}
