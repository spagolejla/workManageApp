import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { MaterialDesignModule } from '../shared/modules/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './components/task/task.component';
import { TaskManageComponent } from './components/task-manage/task-manage.component';


@NgModule({
  declarations: [
    TaskComponent,
    TaskManageComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialDesignModule,
    SharedModule,
    ReactiveFormsModule 
  ],
  entryComponents: [
    TaskManageComponent
  ]
})
export class TaskModule { }
