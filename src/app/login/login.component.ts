import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FashionService } from '../fashion.service';
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
export class LoginComponent {

  constructor(
    private fashionService: FashionService,
    private router: Router,
    private message: NzMessageService
  ) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  // getter
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.fashionService.login(username, password).subscribe(
      (data : any) => {
        localStorage.setItem('token', data.token);
        // console.log("token",data.token);
        this.message.success('Đăng nhập thành công');
        this.router.navigate(['/home']);
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
