import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrl: './shopping-list.component.css',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatButtonModule, MatIconModule, MatTableModule]
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
