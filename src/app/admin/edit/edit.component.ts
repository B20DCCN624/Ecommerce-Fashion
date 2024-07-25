import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FashionService } from '../../fashion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../../fashion';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(
    private fashionService: FashionService,
    private router: Router,
    private route: ActivatedRoute,
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
    sold: 0,
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      let id = String(param.get('id'));
      this.getById(id);
    })
  }

  getById(id: String) {
    this.fashionService.editFashion(id).subscribe( data => {
      this.formData = data;
      // console.log("This is data", this.formData);
    })
  }

  onSubmit() {
    this.fashionService.updateFashion(this.formData).subscribe( data => {
      console.log(data);
      this.router.navigate(['/admin']);
    });
  }
}
