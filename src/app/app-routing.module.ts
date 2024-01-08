import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlannerComponent } from './planner/planner.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'planner',component:PlannerComponent},
  {path:'products',component:ProductsComponent},
  {path:'shoppinglist',component:ShoppingListComponent},
  {path: '',pathMatch:'full',redirectTo:'planner'},
  {path: '**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
