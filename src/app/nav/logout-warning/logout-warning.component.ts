import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-logout-warning',
    templateUrl: './logout-warning.component.html',
    styleUrl: './logout-warning.component.css',
    standalone: true,
    imports: [MatButtonModule]
})
export class LogoutWarningComponent {

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }

    return `${value}`;
  }
}
