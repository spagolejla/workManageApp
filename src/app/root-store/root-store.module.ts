import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EmployeesStoreModule } from './emloyees-store';
import { RouterModule } from '@angular/router';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ProjectsStoreModule } from './projects-store';
import { TasksStoreModule } from './task-store';
import { TimesheetsStoreModule } from './timesheet-store';
import { SharedStoreModule } from './shared-store';
import { InvoicesStoreModule } from './invoice-store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({
      router: routerReducer,
    }),
    RouterModule.forRoot([
      // routes
    ]),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot(),
    EmployeesStoreModule,
    ProjectsStoreModule,
    TasksStoreModule,
    TimesheetsStoreModule,
    SharedStoreModule,
    InvoicesStoreModule
  ]
})
export class RootStoreModule { }
