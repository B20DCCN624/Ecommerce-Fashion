import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
import { CreateComponent } from '../admin/create/create.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotiComponent } from './noti/noti.component';
import { AdminComponent } from '../admin/admin/admin.component';
import { ProductComponent } from '../admin/product/product.component';
import { EditComponent } from '../admin/edit/edit.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'create', component: CreateComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'noti', component: NotiComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'product', component: ProductComponent},
  {path: 'edit/:id', component: EditComponent},
];
