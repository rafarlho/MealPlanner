import { Component, Inject} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Product, ProductType } from '../../models/product.model';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-products-bottom-sheet',
  templateUrl: './products-bottom-sheet.component.html',
  styleUrl: './products-bottom-sheet.component.css',
})
export class ProductsBottomSheetComponent {
  ProductType = ProductType;
  onEdit:Boolean=false
  
  prodForm = this.fb.group({
    name:['',[Validators.required]],
    type:[2,[Validators.required]],
    ingredients:[''],
  })
  
  constructor(
    private matBottomSheetRef:MatBottomSheetRef,
    private fb:FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Product
  ){}

  ngOnInit(): void {
    if (this.data != null) {
      this.onEdit=true;
      this.prodForm.setValue({
        name: this.data.name,
        type:this.data.type,
        ingredients: this.data.ingredients ? this.data.ingredients.join(',') : ''
      });
    }
    else this.onEdit = false
  }

  ngOnDestroy(): void {
    this.matBottomSheetRef.dismiss()
  }
  onCloseClick() {
    this.matBottomSheetRef.dismiss();
  }
  onSubmit(){
    if(this.prodForm.value.name && this.prodForm.value.type!=null) {
      if(!this.onEdit) {

        let newP:Product = {name:this.prodForm.value.name,type: this.prodForm.value.type}
        if(this.prodForm.value.ingredients) {
          newP.ingredients = this.prodForm.value.ingredients.split(',')
        }
        this.matBottomSheetRef.dismiss(newP)
      }
      else {
        this.data.name = this.prodForm.value.name
        this.data.type = this.prodForm.value.type
        if(this.prodForm.value.ingredients) {
          this.data.ingredients = this.prodForm.value.ingredients.split(',')
        }
        this.matBottomSheetRef.dismiss(this.data)
      }
    }

  }
  getTypeName(type:ProductType):string {
    return type === ProductType.Carbs ? 'Carbs' : 'Protein'
  }
  getTypeVal(val:string):ProductType {
    return val === 'Carbs' ? ProductType.Carbs : ProductType.Protein
  }
}
