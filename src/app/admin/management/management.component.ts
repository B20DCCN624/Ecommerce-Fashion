import { Component, OnInit } from '@angular/core';
import { FashionService } from '../../fashion.service';
import { Router, RouterLink } from '@angular/router';
import { Account } from '../../account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {
  allAccount: Account [] = []

  constructor(
    private fashionService: FashionService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.fashionService.getAllAccount().subscribe( data => {
        this.allAccount = data;
      })
  }

  onDelete(id: string) {
    this.fashionService.deleteAccount(id).subscribe( data => {
      this.allAccount = this.allAccount.filter(item => item._id !== id);
    })
  }

  showConfirm() {

  }
}
