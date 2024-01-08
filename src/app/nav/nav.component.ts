import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Observer, tap } from 'rxjs';
import { LogoutWarningComponent } from './logout-warning/logout-warning.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  hideLogo:boolean= false
  isMobile:boolean = false
  hideIcons:boolean=false
  constructor(
    private breakpointService:BreakpointObserver,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.breakpointService
      .observe([Breakpoints.Small,Breakpoints.XSmall])
      .subscribe((result)=>{
        this.hideLogo = false
        this.hideIcons =false
        this.isMobile = false
        //Code not right
        //if(this.breakpointService.isMatched(Breakpoints.Medium)){
        //  this.hideIcons=true;
        //}

        if(result.matches) {
          this.hideLogo=true
          this.isMobile=true
          this.hideIcons=true
        }
      })
  }

  openDialog() {
    this.dialog.open(LogoutWarningComponent);
  }

}
