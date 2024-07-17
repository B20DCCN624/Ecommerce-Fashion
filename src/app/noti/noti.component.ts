import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-noti',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './noti.component.html',
  styleUrl: './noti.component.css'
})
export class NotiComponent {

}
