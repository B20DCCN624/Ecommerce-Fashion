import { Component } from '@angular/core';
import { FashionService } from '../../fashion.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private fashionService: FashionService,
    private router: Router,
    private message: NzMessageService
  ) {}

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    role: new FormControl('')
  })

  //getter
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get role() { return this.registerForm.get('role'); }

  onSubmit() {
    const {username, password, role} = this.registerForm.value;
    this.fashionService.register(username, password, role).subscribe( data => {
      this.message.success('Tạo tài khoản thành công');
      this.router.navigate(['/login']);
    })
  }
}
