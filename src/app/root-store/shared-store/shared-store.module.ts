import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedEffects } from "./effects";
import { reducer } from "./reducers";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('shared', reducer),
    EffectsModule.forFeature([SharedEffects])
  ]
})
export class SharedStoreModule { }