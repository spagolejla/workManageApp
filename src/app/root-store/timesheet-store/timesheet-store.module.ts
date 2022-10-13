import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TimesheetEffects } from "./effects";
import { reducer } from "./reducers";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('timesheets', reducer),
    EffectsModule.forFeature([TimesheetEffects])
  ]
})
export class TimesheetsStoreModule { }