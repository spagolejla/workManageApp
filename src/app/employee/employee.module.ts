import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeManageComponent } from './components/employee-manage/employee-manage.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MaterialDesignModule } from '../shared/modules/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { BasicDataComponent } from './components/employee-details/basic-data/basic-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';



@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeManageComponent,
    BasicDataComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialDesignModule,
    SharedModule,
    ReactiveFormsModule 
  ],
  entryComponents: [
    EmployeeManageComponent,
    UserProfileComponent
  ]
})
export class EmployeeModule { }
