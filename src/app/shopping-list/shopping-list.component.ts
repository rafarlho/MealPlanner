import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {

  dataSource= [
    {name:"Batata", quantity:5},
    {name:"Batata", quantity:5},
    {name:"Batata", quantity:5},
    {name:"Batata", quantity:5},
    {name:"Batata", quantity:5},
    {name:"Batata", quantity:5},
    {name:"Batata", quantity:5},
  ]
  displayedColumns = ['name','quantity','options']


  itemForm = this.fb.group({
    name:['',[Validators.required]],
    quantity:['',[Validators.required,Validators.min(1)]],
  })

  constructor(
    private fb:FormBuilder
  ) {}

  onSubmit() {
    
  }
}
