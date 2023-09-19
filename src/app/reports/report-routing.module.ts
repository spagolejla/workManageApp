import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskPerProjectReportComponent } from "./components/task-per-project-report/task-per-project-report.component";
import { UserActivityReportComponent } from "./components/user-activity-report/user-activity-report.component";
import { ProgressOnProjectsReportComponent } from "./components/progress-on-projects-report/progress-on-projects-report.component";

const routes: Routes = [ 
    {
      path: 'task-per-project-report',
      component: TaskPerProjectReportComponent,
      //canActivate: [LoggedInGuard]
    },
    {
      path: 'user-activity-report',
      component: UserActivityReportComponent,
      //canActivate: [LoggedInGuard]
    },
    {
      path: 'progress-on-projects-report',
      component: ProgressOnProjectsReportComponent,
      //canActivate: [LoggedInGuard]
    },

    
  ];
  
  
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class ReportRoutingModule { }