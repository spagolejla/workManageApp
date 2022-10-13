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



@NgModule({
  declarations: [
    HeaderComponent,
    NavMenuComponent,
    DashboardComponent,
    VarDirective,
    YesNoPipe,
    ConnectFormDirective
  ],
  imports: [
    CommonModule,
    PrimengModule,
    MaterialDesignModule,
  ],
  exports: [
    NavMenuComponent,
    HeaderComponent,
    VarDirective,
    YesNoPipe,
    ConnectFormDirective
  ]
})
export class SharedModule { }
