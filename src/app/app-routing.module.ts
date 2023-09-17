import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(x => x.EmployeeModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then(x => x.ProjectModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(x => x.TaskModule)
  },
  {
    path: 'timesheet',
    loadChildren: () => import('./timesheet/timesheet.module').then(x => x.TimesheetModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoices/invoice.module').then(x => x.InvoiceModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./reports/report.module').then(x => x.ReportModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
