import { Component, Inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrl: './delete-alert.component.css'
})
export class DeleteAlertComponent {


  constructor(
    private prodService:ProductsService,
    @Inject(MAT_DIALOG_DATA) public data:Observable<Product[]>,
    public dialogRef:MatDialogRef<DeleteAlertComponent>
  ) {}

  deleteAllProducts() {
    this.prodService.deleteAllProducts(this.data)
    
    this.dialogRef.close()
    
  }
  cancel(){
    this.dialogRef.close()
  }
}
