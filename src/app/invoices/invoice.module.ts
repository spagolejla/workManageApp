import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceManageComponent } from './components/invoice-manage/invoice-manage.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { MaterialDesignModule } from '../shared/modules/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceManageComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    MaterialDesignModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InvoiceComponent
  ],
  entryComponents: [
    InvoiceManageComponent,
    InvoiceDetailsComponent
  ]
})
export class InvoiceModule { }
