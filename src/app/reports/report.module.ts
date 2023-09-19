import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'primeng/api';
import { TaskPerProjectReportComponent } from './components/task-per-project-report/task-per-project-report.component';
import { MaterialDesignModule } from '../shared/modules/material-design.module';
import { NgChartsModule } from 'ng2-charts';
import { UserActivityReportComponent } from './components/user-activity-report/user-activity-report.component';
import { ProgressOnProjectsReportComponent } from './components/progress-on-projects-report/progress-on-projects-report.component';

@NgModule({
  declarations: [
    TaskPerProjectReportComponent,
    UserActivityReportComponent,
    ProgressOnProjectsReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    MaterialDesignModule,
    NgChartsModule
  ]
})
export class ReportModule { }
