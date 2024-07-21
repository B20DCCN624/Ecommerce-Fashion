import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FashionService } from '../../fashion.service';
import { Fashion } from '../../fashion';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [NzModalService]
})
export class ProductComponent implements OnInit {
  allFashion: Fashion[] = [];
  confirmModal?: NzModalRef;
  confirmName: string = '';
  errorMessage: string = '';
  isNameValid: boolean = false;

  formData!: Fashion;
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(
    private fashionService: FashionService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.fashionService.getAllFashion().subscribe(data => {
      this.allFashion = data;
    });
  }

  validateName() {
    if (this.confirmName === this.formData.name) {
      this.isNameValid = true;
      this.errorMessage = '';
    } else {
      this.isNameValid = false;
      this.errorMessage = 'Nhap lai ten san pham';
    }
    this.updateModalConfig();
  }

  deleteItem(id: String) {
    this.fashionService.deleteFashion(id).subscribe(data => {
      this.allFashion = this.allFashion.filter(item => item._id !== id);
      if (this.confirmModal) {
        this.confirmModal.close();
      }
    });
  }

  showConfirm(fashion: Fashion): void {
    this.formData = { ...fashion };
    this.confirmName = '';
    this.errorMessage = '';
    this.isNameValid = false;

    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to delete this item '${this.formData.name}'?`,
      nzContent: this.modalContent,
      nzOkDisabled: true, 
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          if (this.isNameValid) {
            this.deleteItem(this.formData._id);
            resolve(true);
          } else {
            reject();
          }
        }).catch(() => console.log('Oops errors!'))
    });

    // Lắng nghe sự thay đổi của isNameValid để cập nhật trạng thái nút OK
    this.confirmModal.afterOpen.subscribe(() => {
      this.updateModalConfig();
    });
  }

  updateModalConfig(): void {
    if (this.confirmModal) {
      this.confirmModal.updateConfig({
        nzOkDisabled: !this.isNameValid
      });
    }
  }
}
