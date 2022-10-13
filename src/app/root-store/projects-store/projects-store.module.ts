import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ProjectEffects } from "./effects";
import { reducer } from "./reducers";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('projects', reducer),
    EffectsModule.forFeature([ProjectEffects])
  ]
})
export class ProjectsStoreModule { }