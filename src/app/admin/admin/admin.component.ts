import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CreateComponent } from '../create/create.component';
import { LoginComponent } from "../../user/login/login.component";
import { RegisterComponent } from "../../user/register/register.component";
import { HomeComponent } from "../../user/home/home.component";
import { ProductComponent } from "../product/product.component";
import { filter } from 'rxjs';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { OrderComponent } from "../order/order.component";
import { ManagementComponent } from '../management/management.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    NzTabsModule,
    RouterOutlet,
    RouterLink,
    CreateComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    DashboardComponent,
    OrderComponent,
    ManagementComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  selectedTab = 0;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  onTabChange(index: number): void {
    this.selectedTab = index;
    if(index === 5) {
      this.logOut();
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if(!token) {
        this.router.navigate(['/about']);
        return;
      }

      const decodedToken: any = decodeJWT(token);
      if(decodedToken.role !== 'admin') {
          this.router.navigate(['/home']);
      }
    }
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }

}

function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

