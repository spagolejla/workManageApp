import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TimesheetDetailsComponent } from "./components/timesheet-details/timesheet-details.component";
import { TimesheetComponent } from "./components/timesheet/timesheet.component";

const routes: Routes = [ 
    {
      path: '',
      component: TimesheetComponent,
      //canActivate: [LoggedInGuard]
    },
    {
      path: 'details/:id',
      component: TimesheetDetailsComponent,
      //canActivate: [LoggedInGuard]
    },

  ];
  
  
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class TimesheetRoutingModule { }