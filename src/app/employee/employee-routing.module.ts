import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeDetailsComponent } from "./components/employee-details/employee-details.component";
import { EmployeeComponent } from "./components/employee/employee.component";

const routes: Routes = [ 
    {
      path: '',
      component: EmployeeComponent,
      //canActivate: [LoggedInGuard]
    },
    {
      path: 'details/:id',
      component: EmployeeDetailsComponent,
     // canActivate: [LoggedInGuard]
    }

  ];
  
  
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class EmployeeRoutingModule { }