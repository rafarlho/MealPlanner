import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { DayModel } from '../models/days.model';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Observable, Observer, Subject, take, tap } from 'rxjs';
import { PlannerDialogService } from '../services/planner-dialog-service.service';
import { DaysValidator } from '../models/days-validator.model';
import { DayService } from '../services/day.service';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})
export class PlannerComponent {
  daysActive!:DaysValidator
  daysList$!:Observable<DayModel[]>
  carbsList$!:Observable<Product[]>
  protsList$!:Observable<Product[]>
  isMedium:boolean = false
  selectedProteins: { [dayNumber: number]: Product } = {};
  selectedCarbs: { [dayNumber: number]: Product } = {};

  constructor(
    private breakpointService:BreakpointObserver,
    private productService:ProductsService,
    private dialogService:PlannerDialogService,
    private dayService:DayService
  ){}

  ngOnInit(): void {
    this.carbsList$ = this.productService.getProductsCarbs()
    this.protsList$ = this.productService.getProductsProteins()
    this.daysList$ = this.dayService.getDays()
    this.daysList$.pipe(take(1),tap((day)=>{
      if(day.length != 7) {
        this.addDays()
       
      }
    }))
      .subscribe()
    this.breakpointService
      .observe([Breakpoints.Medium,Breakpoints.Small,Breakpoints.XSmall])
      .subscribe((result)=>{
        this.isMedium = false
        if(result.matches) {
          this.isMedium=true
        }
      })

    this.dialogService.data$.pipe(take(1)).subscribe({
      next:(data:DaysValidator) => {
        if(data) {
          this.daysActive = data
          console.log("in subscribe ", this.daysActive)
          
        }
      
      },
      error: (error)=>console.error(error),
      complete: () => console.log("completed!")
    })
  }

  setLunch(id:String|undefined,i:number){
    if(id) {
      const lunch:Product[] = [this.selectedCarbs[i],this.selectedProteins[i]]
      console.log("lunchhhhhhh ",lunch)
      console.log("day id ",id)
    }
  }

  setStep(day:DayModel,step: number) {
    day.step=step
  }


  addDays() {
    const days:DayModel[] = [
      { name:"Monday", id:'',lunch:[],dinner:[],step:0},
      { name:"Tuesday", id:'',lunch:[],dinner:[],step:0},
      { name:"Wednesday", id:'',lunch:[],dinner:[],step:0},
      { name:"Thursday", id:'',lunch:[],dinner:[],step:0},
      { name:"Friday", id:'',lunch:[],dinner:[],step:0},
      { name:"Saturday", id:'',lunch:[],dinner:[],step:0},
      { name:"Sunday", id:'',lunch:[],dinner:[],step:0},
    ]
    for(let i = 0 ; i < days.length ; i++) {
      this.dayService.addDay(days[i])
    }
  }
}
