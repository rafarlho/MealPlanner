import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DayModel } from '../models/days.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, filter, forkJoin, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private dayCollection!: AngularFirestoreCollection<DayModel>
  
  constructor(
    private storage:AngularFireStorage,
    private firestore:AngularFirestore,
  ) {
    this.dayCollection = firestore.collection('days')
    
  }

  getDays(): Observable<DayModel[]> {
    return this.dayCollection.valueChanges();
  }

  addDay(d:DayModel) {
    d.id=this.firestore.createId()
    return this.dayCollection.doc(d.id).set(d)
  }
}
