import { Component} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Product, ProductType } from '../../models/product.model';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-products-bottom-sheet',
  templateUrl: './products-bottom-sheet.component.html',
  styleUrl: './products-bottom-sheet.component.css',
})
export class ProductsBottomSheetComponent {
  ProductType = ProductType;
  prodForm = this.fb.group({
    name:['',[Validators.required]],
    type:['',[Validators.required]],
    ingredients:[''],
  })
  
  constructor(
    private matBottomSheetRef:MatBottomSheetRef,
    private fb:FormBuilder,
  ){}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matBottomSheetRef.dismiss()
  }
  onCloseClick() {
    this.matBottomSheetRef.dismiss();
  }
  onSubmit(){
    if(this.prodForm.value.name && this.prodForm.value.type!=null) {
      let newP:Product = {name:this.prodForm.value.name,type: this.getTypeVal(this.prodForm.value.type)}
      if(this.prodForm.value.ingredients) {
        newP.ingredients = [this.prodForm.value.ingredients]
      }
      this.matBottomSheetRef.dismiss(newP)
    }
  }
  getTypeName(type:ProductType):string {
    return type === ProductType.Carbs ? 'Carbs' : 'Protein'
  }
  getTypeVal(val:string):ProductType {
    return val === 'Carbs' ? ProductType.Carbs : ProductType.Protein
  }
}
