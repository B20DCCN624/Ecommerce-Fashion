import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FashionService } from '../../fashion.service';
import { Fashion } from '../../fashion';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [FashionService]
})
export class CreateComponent implements  OnInit{

  constructor(
    private fashionService: FashionService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
    oldPrice: new FormControl('', [Validators.required]),
    newPrice: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  })

  //getter
  get name() { return this.productForm.get('name'); }
  get rating() { return this.productForm.get('rating'); }
  get oldPrice() { return this.productForm.get('oldPrice'); }
  get newPrice() { return this.productForm.get('newPrice'); }
  get description() { return this.productForm.get('description'); }
  get image() { return this.productForm.get('image'); }
  get quantity() { return this.productForm.get('quantity'); }
  get category() { return this.productForm.get('category'); }

  formData: Fashion = {
    _id: '',
    name: '',
    rating: 0,
    oldPrice: 0,
    newPrice: 0,
    description: '',
    image: '',
    quantity: 0,
    category: '',
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/home']);
        return;
      }

      const decodedToken: any = decodeJWT(token);
      if (decodedToken.role !== 'admin') {
        console.log(decodedToken.role);
        this.router.navigate(['/home']);
      }
    }
  }

  onSubmit() {
    this.fashionService.createFashion(this.formData).subscribe( data => {
      console.log(data);
      this.router.navigate(['/admin']);
    });
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

