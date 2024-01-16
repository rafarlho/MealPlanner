import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DayModel } from '../models/days.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private dayCollection!: AngularFirestoreCollection<DayModel>
  
  constructor(
    private storage:AngularFireStorage,
    private firestore:AngularFirestore,
  ) {
    this.dayCollection = firestore.collection('days',ref=>ref.orderBy('day','asc'))
    
  }

  getDays(): Observable<DayModel[]> {
    return this.dayCollection.valueChanges().pipe(
      take(1),
      tap((day)=>{
        if(day.length != 7) {
          this.deleteAllDays(day)
          this.addDays()
          }
        }),
      );
  }

  addDay(d:DayModel) {
    d.id=this.firestore.createId()
    return this.dayCollection.doc(d.id).set(d)
  }

  setLunch(day:DayModel) {
    day.step=0
    return this.dayCollection.doc(day.id).set(day)
  }
  
  setDinner(day:DayModel) {
    day.step=0
    return this.dayCollection.doc(day.id).set(day)
  }

  deleteLunch(d:DayModel) {
    d.lunch=[]
    d.step=0
    return this.dayCollection.doc(d.id).set(d)
  } 
  
  deleteDinner(d:DayModel) {
    d.dinner=[]
    d.step=0
    return this.dayCollection.doc(d.id).set(d)
  }

  deleteAllDays(days:DayModel[]) {
    for(let i = 0 ; i < days.length;i++) {
      this.dayCollection.doc(days[i].id).delete()
    }
  }

  private addDays() {
    const days:DayModel[] = [
      { name:"Monday", id:'',lunch:[],dinner:[],step:0,day:0},
      { name:"Tuesday", id:'',lunch:[],dinner:[],step:0,day:1},
      { name:"Wednesday", id:'',lunch:[],dinner:[],step:0,day:2},
      { name:"Thursday", id:'',lunch:[],dinner:[],step:0,day:3},
      { name:"Friday", id:'',lunch:[],dinner:[],step:0,day:4},
      { name:"Saturday", id:'',lunch:[],dinner:[],step:0,day:5},
      { name:"Sunday", id:'',lunch:[],dinner:[],step:0,day:6},
    ]
    for(let i = 0 ; i < days.length ; i++) {
      console.log("adding ",days[i].name)
      this.addDay(days[i])
    }
  }
}
