import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  onLogin() {
    localStorage.removeItem('token');
  }

}
