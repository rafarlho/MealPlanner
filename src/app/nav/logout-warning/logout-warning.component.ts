import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-warning',
  templateUrl: './logout-warning.component.html',
  styleUrl: './logout-warning.component.css'
})
export class LogoutWarningComponent {

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }

    return `${value}`;
  }
}