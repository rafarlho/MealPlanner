import { Component } from '@angular/core';
import { Product, ProductType } from '../models/product.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductsBottomSheetComponent } from './products-bottom-sheet/products-bottom-sheet.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {
  productList$!:Observable<Product[]>;

  displayedColumns = ['name','type','options']


  constructor(
    private matBottomSheet:MatBottomSheet,
    private breakpointService:BreakpointObserver,
    private prodService:ProductsService,
  ){}

  isMobile:boolean = false
  ngOnInit(): void {
    this.productList$ = this.prodService.getProducts()
    this.breakpointService
      .observe([Breakpoints.Small,Breakpoints.XSmall,Breakpoints.Medium])
      .subscribe((result)=>{
        this.isMobile = false
        if(result.matches) this.isMobile=true
    })
  }

  onTriggerSheetClick() {
    let bottomSheet = this.matBottomSheet.open(ProductsBottomSheetComponent,{disableClose:true,})
    bottomSheet.afterDismissed().subscribe((result)=>{
      if(result) {
        this.prodService.addProduct(result)
      }
    })
  }

  getTypeNme(type:ProductType):string {
    return type === ProductType.Carbs ? 'Carbs' : 'Protein'
  }

  deleteProd(p:Product) {
    this.prodService.deleteProduct(p)
  }

  deleteAllProducts() {
    
  }
  
}

