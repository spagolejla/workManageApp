import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../shared/modules/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './components/project/project.component';
import { ProjectManageComponent } from './components/project-manage/project-manage.component';


@NgModule({
  declarations: [
  
    ProjectComponent,
       ProjectManageComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MaterialDesignModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  entryComponents: [
  ]
})
export class ProjectModule { }
