import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product, ProductType } from '../models/product.model';
import { Observable, filter, map, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productCollection!:AngularFirestoreCollection<Product>

  constructor(
    private storage:AngularFireStorage,
    private firestore:AngularFirestore,
    private snackBar:MatSnackBar,
  ) {
    this.productCollection = firestore.collection('products')
  }

  addProduct(p:Product) {
    p.id=this.firestore.createId()
    return this.productCollection.doc(p.id).set(p)
  }

  getProducts():Observable<Product[]> {
    return this.productCollection.valueChanges()
  }
  
  getProductsCarbs():Observable<Product[]> {
    return this.productCollection.valueChanges().pipe(
      map((products:Product[]) => products.filter((product)=> {
        return product.type === ProductType.Carbs
      }))
    )
  }
  
  getProductsProteins():Observable<Product[]> {
    return this.productCollection.valueChanges().pipe(
      map((products:Product[]) => products.filter((product)=> {
        return product.type === ProductType.Protein
      }))
    )
  }

  deleteProduct(p:Product) {
    return this.productCollection.doc(p.id).delete()
  }

  updateProduct(p:Product) {
    return this.productCollection.doc(p.id).set(p)
  }

  deleteAllProducts(pObs:Observable<Product[]>) {
    pObs
      .pipe(take(1))
      .subscribe({
        next:(products) =>{
          products.forEach(
            (p) => {
            this.productCollection.doc(p.id).delete()
            }
          )},
        error:(error) =>
          this.snackBar.open('An error ocurred deleting.' ,'OK',{duration:3000})
        ,
        complete: ()=>
          this.snackBar.open('Deleted all files.' ,'OK',{duration:3000})
      })      
  }

}
