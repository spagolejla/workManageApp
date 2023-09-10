import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { InvoiceEffects } from "./effects";
import { reducer } from "./reducers";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('invoices', reducer),
    EffectsModule.forFeature([InvoiceEffects])
  ]
})
export class InvoicesStoreModule { }