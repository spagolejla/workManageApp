import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { PrimengModule } from './modules/primeng.module';
import { MaterialDesignModule } from './modules/material-design.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VarDirective } from './directives/variable.directive';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { ConnectFormDirective } from './directives/connect-form-ngrx';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoursMinutesPipe } from './pipes/hours-minutes.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    NavMenuComponent,
    DashboardComponent,
    VarDirective,
    YesNoPipe,
    ConnectFormDirective,
    LoginComponent,
    HoursMinutesPipe
  ],
  imports: [
    CommonModule,
    PrimengModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavMenuComponent,
    HeaderComponent,
    VarDirective,
    YesNoPipe,
    ConnectFormDirective,
    LoginComponent,
    HoursMinutesPipe
  ]
})
export class SharedModule { }
