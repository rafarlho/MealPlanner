import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productCollection!:AngularFirestoreCollection<Product>

  constructor(
    private storage:AngularFireStorage,
    private firestore:AngularFirestore,
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

  deleteProduct(p:Product) {
    return this.productCollection.doc(p.id).delete()
  }

}
