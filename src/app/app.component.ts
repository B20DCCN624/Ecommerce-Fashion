import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FashionService } from './fashion.service';
import { filter } from 'rxjs';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CartItem } from './cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    NzMenuModule,
    RouterLink,
    CommonModule,
    NzDropDownModule,
    NzBadgeModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Ecommerce-Fashion';

  allCart: CartItem [] = []
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(
    public router: Router,
    private fashionService: FashionService,
    private cd: ChangeDetectorRef,
    //Local storage
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logOut() {
    localStorage.removeItem('token');
    this.username = ''
    this.isLoggedIn = false
    this.cd.detectChanges()
    this.updateCart();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.checkLoginStatus();
        this.updateCart();
      });

      this.fashionService.getAllCart().subscribe(data => {
        this.allCart = data;
      })
    }
  }

  private checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    if(token) {
      this.fashionService.getCurrentAccount().subscribe( data => {
        if(data) {
          this.isLoggedIn = true;
          this.username = data.username;
        } else {
          this.isLoggedIn = false;
        }
        this.cd.detectChanges() // Cập nhật lại giao diện sau khi kiểm tra trạng thái đăng nhập
      })
    }
  }

  private updateCart() {
    this.fashionService.getAllCart().subscribe( data => {
      this.allCart = data;
      this.cd.detectChanges();
    })
  }
}
