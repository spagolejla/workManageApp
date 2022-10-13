import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TimesheetComponent } from "./components/timesheet/timesheet.component";

const routes: Routes = [ 
    {
      path: '',
      component: TimesheetComponent,
      //canActivate: [LoggedInGuard]
    },

  ];
  
  
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class TimesheetRoutingModule { }