import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CreateComponent } from '../create/create.component';
import { LoginComponent } from "../../user/login/login.component";
import { RegisterComponent } from "../../user/register/register.component";
import { HomeComponent } from "../../user/home/home.component";
import { ProductComponent } from "../product/product.component";
import { filter } from 'rxjs';

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
    ProductComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  selectedTab = 0;

  onTabChange(index: number): void {
    this.selectedTab = index;
  }

}
