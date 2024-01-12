import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { DayModel } from '../models/days.model';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Observable, Observer, Subject, map, of, switchMap, take, tap } from 'rxjs';

import { DayService } from '../services/day.service';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})
export class PlannerComponent {
  
  daysList$!:Observable<DayModel[]>
  carbsList$!:Observable<Product[]>
  protsList$!:Observable<Product[]>
  isMedium:boolean = false

  selectedProteinsLunch: { [dayNumber: number]: Product } = {};
  selectedCarbsLunch: { [dayNumber: number]: Product } = {};
  selectedProteinsDinner: { [dayNumber: number]: Product } = {};
  selectedCarbsDinner: { [dayNumber: number]: Product } = {};

  constructor(
    private breakpointService:BreakpointObserver,
    private productService:ProductsService,
    private dayService:DayService
  ){}

  ngOnInit(): void {
    this.carbsList$ = this.productService.getProductsCarbs()
    this.protsList$ = this.productService.getProductsProteins()
    this.daysList$ = this.dayService.getDays()
    this.daysList$.pipe(take(1),tap((day)=>{
      if(day.length != 7) {
        this.dayService.deleteAllDays(day)
        this.addDays()
      }
    }),
   
    )
      .subscribe()
    this.breakpointService
      .observe([Breakpoints.Medium,Breakpoints.Small,Breakpoints.XSmall])
      .subscribe((result)=>{
        this.isMedium = false
        if(result.matches) {
          this.isMedium=true
        }
      })
  }

  setLunch(day:DayModel|undefined,i:number){
    if(day) {
      const lunch:Product[] = [this.selectedCarbsLunch[i],this.selectedProteinsLunch[i]]
      day.lunch = lunch
      day.step=0
      this.dayService.setLunch(day);
    }
  } 
  setDinner(day:DayModel|undefined,i:number){
    if(day) {
      const dinner:Product[] = [this.selectedCarbsDinner[i],this.selectedProteinsDinner[i]]
      day.dinner = dinner
      day.step=0
      this.dayService.setDinner(day);
    }
  }

  setStep(day:DayModel,step: number) {
    day.step=step
  }

  sortDays(days: DayModel[]): Observable<DayModel[]> {
    return of(days.sort((a, b) => a.day - b.day));
  }

  addDays() {
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
      this.dayService.addDay(days[i])
    }
  }
}
