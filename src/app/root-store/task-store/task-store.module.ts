import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TaskEffects } from "./effects";
import { reducer } from "./reducers";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', reducer),
    EffectsModule.forFeature([TaskEffects])
  ]
})
export class TasksStoreModule { }