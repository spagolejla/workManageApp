import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab

import {TreeModule} from 'primeng/tree';
import {ContextMenuModule} from 'primeng/contextmenu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule,
    TreeModule,
    ContextMenuModule
  ],
  exports: [
    AccordionModule,
    TreeModule,
    ContextMenuModule
  ]
})
export class PrimengModule { }
