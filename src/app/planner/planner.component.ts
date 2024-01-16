import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { DayModel } from '../models/days.model';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Observable} from 'rxjs';

import { DayService } from '../services/day.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgClass, NgFor, NgIf, AsyncPipe } from '@angular/common';


@Component({
    selector: 'app-planner',
    templateUrl: './planner.component.html',
    styleUrl: './planner.component.css',
    standalone: true,
    imports: [NgClass, NgFor, MatExpansionModule, NgIf, MatFormFieldModule, MatSelectModule, FormsModule, MatOptionModule, MatButtonModule, MatIconModule, AsyncPipe,ReactiveFormsModule]
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
    private dayService:DayService,
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.carbsList$ = this.productService.getProductsCarbs()
    this.protsList$ = this.productService.getProductsProteins()
    this.daysList$ = this.dayService.getDays()
    console.log("carbs ", this.selectedCarbsLunch)
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
      if(!(this.selectedCarbsLunch[i] && this.selectedProteinsLunch[i] )) alert("Please entre both proteins and carbs to set a meal!")
      else {
        const lunch:Product[] = [this.selectedCarbsLunch[i],this.selectedProteinsLunch[i]]
        day.lunch = lunch
        this.dayService.setLunch(day);
      }
    }
  } 
  setDinner(day:DayModel|undefined,i:number){
    if(day) {
      if(!(this.selectedCarbsDinner[i] && this.selectedProteinsDinner[i])) alert("Please entre both proteins and carbs to set a meal!")
      else{
        const dinner:Product[] = [this.selectedCarbsDinner[i],this.selectedProteinsDinner[i]]
        day.dinner = dinner
        this.dayService.setDinner(day);
      }
    }
  }

  deleteLunch(day:DayModel|undefined,i:number){
    if(day) {
      delete this.selectedCarbsLunch[i]
      delete this.selectedProteinsLunch[i]
      this.dayService.deleteLunch(day)
    }
  }
  
  deleteDinner(day:DayModel|undefined,i:number){
    if(day) {
      delete this.selectedCarbsDinner[i]
      delete this.selectedProteinsDinner[i]
      this.dayService.deleteDinner(day)
    }
  }

  setStep(day:DayModel,step: number) {
    day.step=step
  }
}
