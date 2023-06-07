import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { MaterialDesignModule } from '../shared/modules/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { TimesheetDetailsComponent } from './components/timesheet-details/timesheet-details.component';
import { WorkPeriodsListComponent } from './components/work-periods-list/work-periods-list.component';
import { TimesheetActionsComponent } from './components/timesheet-actions/timesheet-actions.component';
import { TimesheetActionManageComponent } from './components/timesheet-action-manage/timesheet-action-manage.component';


@NgModule({
  declarations: [
    TimesheetComponent,
    TimesheetDetailsComponent,
    WorkPeriodsListComponent,
    TimesheetActionsComponent,
    TimesheetActionManageComponent,
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
