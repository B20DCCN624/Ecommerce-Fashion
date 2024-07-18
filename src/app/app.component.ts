import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    NzMenuModule,
    RouterLink,
    CommonModule,
    NzDropDownModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Ecommerce-Fashion';

  constructor(
    public router: Router,
    //Local storage
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logOut() {
    localStorage.removeItem('token');
  }
}
