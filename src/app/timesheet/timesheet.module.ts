import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { MaterialDesignModule } from '../shared/modules/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TimesheetComponent } from './components/timesheet/timesheet.component';


@NgModule({
  declarations: [
    TimesheetComponent,
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    MaterialDesignModule,
    SharedModule,
    ReactiveFormsModule 
  ],
  entryComponents: [

  ]
})
export class TimesheetModule { }
