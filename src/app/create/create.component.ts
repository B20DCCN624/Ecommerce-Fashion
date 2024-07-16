import { Component } from '@angular/core';
import { FashionService } from '../fashion.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fashion } from '../fashion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [FashionService]
})
export class CreateComponent {

  constructor(
    private fashionService: FashionService,
    private router: Router
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

  onSubmit() {
    this.fashionService.createFashion(this.formData).subscribe( data => {
      console.log(data);
      this.router.navigate(['']);
    })
  }
}
