import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskPerProjectReportComponent } from "./components/task-per-project-report/task-per-project-report.component";

const routes: Routes = [ 
    {
      path: 'task-per-project-report',
      component: TaskPerProjectReportComponent,
      //canActivate: [LoggedInGuard]
    },

  ];
  
  
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class ReportRoutingModule { }