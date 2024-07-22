import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FashionService } from './fashion.service';
import { Account } from './account';
import { Fashion } from './fashion';

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
export class AppComponent implements OnInit {
  title = 'Ecommerce-Fashion';

  isLoggedIn: boolean = false;
  username: string = '';

  constructor(
    public router: Router,
    private fashionService: FashionService,
    //Local storage
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logOut() {
    localStorage.removeItem('token');
    this.username = ''
    this.isLoggedIn = false
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.fashionService.getCurrentAccount().subscribe(data => {
          if (data) {
            this.isLoggedIn = true;
            this.username = data.username;
          } else {
            this.isLoggedIn = false;
          }
        });
      }
    }
  }
}
