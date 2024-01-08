import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavComponent } from './nav/nav.component';
import { PlannerComponent } from './planner/planner.component';
import { ProductsComponent } from './products/products.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ProductsBottomSheetComponent } from './products/products-bottom-sheet/products-bottom-sheet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { LogoutWarningComponent } from './nav/logout-warning/logout-warning.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environments';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PlannerComponent,
    ProductsComponent,
    ProductsBottomSheetComponent,
    PageNotFoundComponent,
    ShoppingListComponent,
    LogoutWarningComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatBottomSheetModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
