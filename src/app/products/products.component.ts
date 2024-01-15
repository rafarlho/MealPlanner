import { Component } from '@angular/core';
import { Product, ProductType } from '../models/product.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductsBottomSheetComponent } from './products-bottom-sheet/products-bottom-sheet.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProductsService } from '../services/products.service';
import { Observable, filter, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertComponent } from './delete-alert/delete-alert.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgIf, NgClass } from '@angular/common';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
    ],
})

export class ProductsComponent {
  productList$!:Observable<Product[]>;
  isEmpty!:boolean
  displayedColumns = ['name','type','ingredients','options']


  constructor(
    private matBottomSheet:MatBottomSheet,
    private breakpointService:BreakpointObserver,
    private prodService:ProductsService,
    public dialog: MatDialog,
    
  ){ 
    
    this.productList$ = this.prodService.getProducts()
    this.productList$.pipe(take(1),
      tap((list) =>{
        if(list.length!=0){
          this.isEmpty = false
        }
        else this.isEmpty = true
      })
    ).subscribe()

    this.breakpointService
      .observe([Breakpoints.Small,Breakpoints.XSmall,Breakpoints.Medium])
      .subscribe((result)=>{
        this.isMobile = false
        if(result.matches) this.isMobile=true
    })
  };
  

  isMobile:boolean = false
  ngOnInit(): void {
   
  }

  editProduct(p:Product) {
    let bottomSheet = this.matBottomSheet.open(ProductsBottomSheetComponent,{disableClose:true,data:p})
    bottomSheet.afterDismissed().subscribe((result)=>{
      if(result) {
        this.prodService.updateProduct(result)
      }
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

 
  openDialog(){
    this.dialog.open(DeleteAlertComponent,{data:this.productList$})
  }
}

