import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FashionService } from '../../fashion.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [FashionService]
})
export class LoginComponent implements OnInit{

  constructor(
    private fashionService: FashionService,
    private router: Router,
    private message: NzMessageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  // getter
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.fashionService.login(username, password).subscribe(
      (data : any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', data.token);
        }
        // console.log("token",data.token);
        this.message.success('Đăng nhập thành công')

        const decodeToken = decodeJWT(data.token);
        if(decodeToken.role === 'admin') {
          console.log(decodeToken)
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }

      },
      error => {
        if(error.status === 400) {
          this.message.error('Sai tên đăng nhập hoặc mật khẩu');
          this.loginForm.reset();
        } else if(error.status === 500) {
          this.message.error('Có lỗi xảy ra ở phía server');
          this.loginForm.reset();
        }
      }
    )
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
