import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from './shared/modules/material-design.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PrimengModule } from './shared/modules/primeng.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreModule } from './root-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TimesheetModule } from './timesheet/timesheet.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
   // LayoutModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MaterialDesignModule,
    PrimengModule,
    RootStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EmployeeModule,
    ProjectModule,
    TaskModule,
    TimesheetModule
   // NotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
