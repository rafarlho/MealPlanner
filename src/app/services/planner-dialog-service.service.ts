import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DaysValidator } from '../models/days-validator.model';

@Injectable({
  providedIn: 'root'
})
export class PlannerDialogService {

  constructor() { }

  private dataSubject = new Subject<DaysValidator>()
  data$ = this.dataSubject.asObservable()

  senData(data:DaysValidator) {
    this.dataSubject.next(data)
  }
}
