import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { DayModel } from '../models/days.model';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})
export class PlannerComponent {
  days:DayModel[] = [
    {name:'Monday',step:0,lunch:['Batatas','Frango Caril'],dinner:['asdasd']},
    {name:'Tuesday',step:0,lunch:[],dinner:[]},
    {name:'Wednesday',step:0,lunch:[],dinner:[]},
    {name:'Thursday',step:0,lunch:[],dinner:[]},
    {name:'Friday',step:0,lunch:[],dinner:[]},
    {name:'Saturday',step:0,lunch:[],dinner:[]},
    {name:'Sunday',step:0,lunch:[],dinner:[]}]
  foods:string[] = ['Arroz', 'Massa','Esparguete','Carne']

  isMedium:boolean = false

  constructor(
    private breakpointService:BreakpointObserver
  ){}

  ngOnInit(): void {
    this.breakpointService
      .observe([Breakpoints.Medium,Breakpoints.Small,Breakpoints.XSmall])
      .subscribe((result)=>{
        this.isMedium = false
        if(result.matches) {
          this.isMedium=true
        }
      })
  }

  setStep(index:number,step: number) {
    this.days[index].step=step
  }
}
