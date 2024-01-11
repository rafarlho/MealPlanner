import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlannerDialogService } from '../../services/planner-dialog-service.service';
import { DaysValidator } from '../../models/days-validator.model';

@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrl: './layout-editor.component.css'
})
export class LayoutEditorComponent {

  days = this.fb.group({
    monday:false,
    tuesday:false,
    wednesday:false,
    thursday:false,
    friday:false,
    saturday:false,
    sunday:false,

  })

  constructor(
    private dialogRef: MatDialogRef<LayoutEditorComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DaysValidator,
    private dialogService:PlannerDialogService
  ) {}

  closeDialog() {
    const daysValue = this.days.value; 

    
    const daysVal: DaysValidator = {
      monday: daysValue.monday ?daysValue.monday :false,
      tuesday: daysValue.tuesday ? daysValue.tuesday:false,
      wednesday: daysValue.wednesday ? daysValue.wednesday:false,
      thursday: daysValue.thursday ? daysValue.thursday:false,
      friday: daysValue.friday ? daysValue.friday:false,
      saturday: daysValue.saturday ? daysValue.saturday:false,
      sunday: daysValue.sunday ? daysValue.sunday:false,
    };
    this.dialogService.senData(daysVal)
    this.dialogRef.close()
  }
}
